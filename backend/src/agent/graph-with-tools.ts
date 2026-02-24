import {
  Annotation,
  MessagesAnnotation,
  StateGraph,
  START,
  END,
  type CompiledStateGraph,
} from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGoogle } from "@langchain/google";
import { MultiServerMCPClient } from "@langchain/mcp-adapters";

import { ENV } from "../config/env.js";
import { traceAllNodes } from "../utils/langsmith/tracing.js";

const StateAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
});

const llm = new ChatGoogle({
  model: "gemini-2.5-flash",
  apiKey: ENV.GOOGLE_API_KEY,
  temperature: 0,
});

const mcpClient = new MultiServerMCPClient({
  mcpServers: {
    memory: {
      transport: "sse",
      url: ENV.REDIS_MCP_URL,
      headers: {},
    },
  },
  onConnectionError: "throw", //"ignore",
});

const tools = await mcpClient.getTools();

// React agent as a subgraph - keeps all same functionalities (tools, MCP, etc.)
const reactAgentGraph = createReactAgent({
  llm,
  tools,
});

// React agent as a node - invokes the subgraph and returns new messages
const reactAgentNode = async (state: typeof StateAnnotation.State) => {
  const result = await reactAgentGraph.invoke(state);
  state.messages = [...state.messages, ...result.messages];
  return state;
};

const nodeFn = {
  reactAgentNode,
};

// check logs in langsmith tracing -> default project
const tracedNodeFn = traceAllNodes(nodeFn);

const graph = new StateGraph(StateAnnotation)
  .addNode("react_agent", tracedNodeFn.reactAgentNode)
  .addEdge(START, "react_agent")
  .addEdge("react_agent", END);

const compiledGraph = graph.compile() as CompiledStateGraph<
  typeof StateAnnotation.State,
  typeof StateAnnotation.Update,
  string
>;

export { compiledGraph };
