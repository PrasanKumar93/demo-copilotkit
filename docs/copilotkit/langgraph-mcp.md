## Redis Agent Memory Server Overview

[Redis Agent Memory Server](https://redis.github.io/agent-memory-server/getting-started/) provides:

- **Two-tier memory**: Working (session) + Long-term (persistent)
- **Interfaces**: REST API (port 8000), MCP server (stdio or SSE at port 9000/sse)
- **Features**: Semantic search, auto-extraction, deduplication, multi-tenant namespaces

---

## Integration Options

### Option A: MCP + `@langchain/mcp-adapters` (Recommended)

Use the MCP server as a tool source and load tools into the LangGraph graph via `@langchain/mcp-adapters`.

| Pros                           | Cons                                             |
| ------------------------------ | ------------------------------------------------ |
| Uses official MCP protocol     | Requires Redis MCP server running (Docker or uv) |
| Tools auto-discovered from MCP | Graph must support tool-calling (ReAct pattern)  |

### Option B: REST API + Custom Tools

Create LangChain tools that call the Redis Agent Memory REST API directly.

| Pros                                 | Cons                                   |
| ------------------------------------ | -------------------------------------- |
| No MCP server needed (only REST API) | Must implement tool schemas manually   |
| Works with any HTTP client           | Need to mirror REST endpoints as tools |
| Simpler infra (REST only)            |                                        |

---

## Step-by-Step Implementation

### 1. Run Redis Agent Memory Server

**Option 1: Docker Compose** (from [Redis docs](https://redis.github.io/agent-memory-server/getting-started/))

```bash
# Clone or use the agent-memory-server repo
# set up env file to add OpenAI and Redis URL
cd agent-memory-server
docker-compose up --build
# now check MCP port in docker desktop and set it in .env file
REDIS_MCP_URL="http://localhost:<your-mcp-port>/sse"
```

- REST API: `http://localhost:8000`
- MCP (SSE): `http://localhost:9000/sse`

### Code

```ts title="backend/src/agent/graph-with-tools.ts"
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
```

### 6. Environment Variables

Add to `backend/.env`:

```sh title="backend/.env"
# Existing

LANGSMITH_TRACING=true
REDIS_MCP_URL="http://localhost:9050/sse"
```

Note: Check langsmith tracing -> default project for logs

### 7. Session/User Scoping

CopilotKit sends `threadId` and user context. Map these to Redis memory `session_id` and `user_id`:

- `threadId` → `session_id`
- User ID from auth → `user_id`

Pass these into `getRedisMemoryTools(sessionId, userId)` when building the graph or tools.

---

## Alternative: REST API Tools (Option B)

If you prefer not to run the MCP server:

1. Run only the REST API: `uv run agent-memory api --task-backend asyncio`
2. Create LangChain `StructuredTool` instances that call `http://localhost:8000` endpoints
3. Use the [REST API docs](https://redis.github.io/agent-memory-server/) for endpoints (e.g. create memories, search)
4. Add these tools to the graph the same way as MCP tools

## References

- [Redis Agent Memory Server – Getting Started](https://redis.github.io/agent-memory-server/getting-started/)
- [Redis Agent Memory – LangChain Integration](https://redis.github.io/agent-memory-server/langchain-integration/) (Python)
- [LangGraph MCP – Server MCP](https://langchain-ai.github.io/langgraph/concepts/server-mcp/)
- [@langchain/mcp-adapters (npm)](https://www.npmjs.com/package/@langchain/mcp-adapters)
- [CopilotKit + LangGraph](docs/copilotkit/copilotkit-langgraph.md)
- [CopilotKit UI](docs/copilotkit/copilotkit-ui.md)
