import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGoogle } from "@langchain/google";
import { MultiServerMCPClient } from "@langchain/mcp-adapters";

import { ENV } from "../config/env.js";

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
  onConnectionError: "ignore",
});

const tools = await mcpClient.getTools();

const compiledGraph = createReactAgent({
  llm,
  tools,
});

export { compiledGraph };
