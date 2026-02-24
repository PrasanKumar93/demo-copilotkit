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

const memoryExtractionPrompt = `You have access to Redis Agent Memory MCP tools (set_working_memory, search_long_term_memory, memory_prompt, etc.). Invoke them only via tool calls—never output Python code, pseudo-code, print(...), or raw function syntax. Use the tool-calling mechanism only.

**Retrieval (before answering):** When the user asks a question, first retrieve relevant context. Call memory_prompt (combines working + long-term memories) or search_long_term_memory (semantic search) to fetch prior preferences, facts, and context. Use this to personalize and ground your answers. Do not skip this step—memory retrieval is essential for coherent, context-aware responses.

**Storage (after exchanges):** When storing conversation context via set_working_memory, memories are automatically promoted to long-term storage. To control what gets extracted, use the custom extraction strategy.

For set_working_memory, always pass long_term_memory_strategy with strategy "custom" so we extract technical preferences and skills (programming languages, frameworks, tools) rather than generic facts. The custom_prompt must include the exact placeholders {message} and {current_datetime}—they are substituted by the memory server.

When calling set_working_memory, pass these parameters (as JSON via tool call):
- session_id: use the actual session/thread id
- messages: array of {"role": "user"|"assistant", "content": "..."}
- long_term_memory_strategy: { "strategy": "custom", "config": { "custom_prompt": "Extract technical preferences and skills from: {message}\\n\\nFocus on: programming languages, frameworks, tools.\\nReturn JSON with type, text, topics, entities.\\nCurrent time: {current_datetime}" } }

Output format: memories array with type, text, topics, entities. See Redis Agent Memory docs: https://redis.github.io/agent-memory-server/mcp/`;

// React agent as a subgraph - keeps all same functionalities (tools, MCP, etc.)
const reactAgentGraph = createReactAgent({
  llm,
  tools,
  prompt: memoryExtractionPrompt, //optional prompt for better MCP tool memory usage
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
