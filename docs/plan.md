# Plan: Add Redis Agent Memory Server MCP Support to LangGraph CopilotKit Chatbot

## Current Architecture

| Component | Location | Purpose |
|-----------|----------|---------|
| **Frontend** | `frontend/` | Next.js + CopilotKit React UI (`CopilotSidebar`) |
| **Backend** | `backend/` | Express app, CopilotKit runtime, LangGraph agent |
| **LangGraph** | `backend/src/agent/graph.ts` | StateGraph with Gemini LLM, Google Search grounding |
| **Runtime** | `backend/src/agent/copilotkit-langgraph.ts` | `LangGraphAgent` → LangGraph deployment (port 2024) |

**Flow**: Frontend → CopilotKit (`/copilotkit`) → `LangGraphAgent` → LangGraph dev server (`http://127.0.0.1:2024`)

---

## Redis Agent Memory Server Overview

[Redis Agent Memory Server](https://redis.github.io/agent-memory-server/getting-started/) provides:

- **Two-tier memory**: Working (session) + Long-term (persistent)
- **Interfaces**: REST API (port 8000), MCP server (stdio or SSE at port 9000/sse)
- **Features**: Semantic search, auto-extraction, deduplication, multi-tenant namespaces

---

## Integration Options

### Option A: MCP + `@langchain/mcp-adapters` (Recommended)

Use the MCP server as a tool source and load tools into the LangGraph graph via `@langchain/mcp-adapters`.

| Pros | Cons |
|------|------|
| Uses official MCP protocol | Requires Redis MCP server running (Docker or uv) |
| Tools auto-discovered from MCP | Graph must support tool-calling (ReAct pattern) |
| Same pattern as LangChain Python | Current graph uses direct Gemini call, not tool-calling |

### Option B: REST API + Custom Tools

Create LangChain tools that call the Redis Agent Memory REST API directly.

| Pros | Cons |
|------|------|
| No MCP server needed (only REST API) | Must implement tool schemas manually |
| Works with any HTTP client | Need to mirror REST endpoints as tools |
| Simpler infra (REST only) | |

### Option C: MCP in Cursor/IDE Only

Configure Cursor or another MCP client to use Redis Memory. This adds memory to the **IDE’s AI**, not the chatbot.

| Use case | When to use |
|----------|-------------|
| Memory for Cursor AI | If you want the IDE assistant to remember context |
| Not for chatbot | Does not affect the CopilotKit chatbot |

---

## Recommended Path: Option A (MCP + LangGraph)

### Prerequisites

1. **Redis** running (e.g. `docker run -p 6379:6379 redis`)
2. **Redis Agent Memory Server** (Docker Compose or uv)
3. **LangGraph graph** refactored to use tool-calling (ReAct-style agent)

---

## Step-by-Step Implementation

### 1. Run Redis Agent Memory Server

**Option 1: Docker Compose** (from [Redis docs](https://redis.github.io/agent-memory-server/getting-started/))

```bash
# Clone or use the agent-memory-server repo
cd agent-memory-server
docker-compose up --build
```

- REST API: `http://localhost:8000`
- MCP (SSE): `http://localhost:9000/sse`

**Option 2: uv (local dev)**

```bash
pip install uv
uv sync  # in agent-memory-server repo
uv run agent-memory mcp --mode sse --task-backend asyncio
```

**Option 3: uvx (no checkout)**

```json
// For MCP clients (e.g. Claude Desktop) - reference only
{
  "mcpServers": {
    "memory": {
      "command": "uvx",
      "args": ["--from", "agent-memory-server", "agent-memory", "mcp"],
      "env": {
        "DISABLE_AUTH": "true",
        "REDIS_URL": "redis://localhost:6379",
        "OPENAI_API_KEY": "<your-key>"
      }
    }
  }
}
```

### 2. Install Dependencies

```bash
cd backend
npm install @langchain/mcp-adapters @langchain/langgraph @langchain/core
```

### 3. Refactor the LangGraph Graph for Tool-Calling

The current `graph.ts` uses a single `llmNode` that calls Gemini directly. To use MCP tools (including Redis memory), switch to a ReAct-style agent that can call tools.

**Current pattern** (simplified):

```
START → llm (Gemini direct) → END
```

**Target pattern**:

```
START → agent (LLM + tools: memory, search, etc.) → END
```

Use `createReactAgent` from `@langchain/langgraph/prebuilt` or build a graph with a tool-calling node.

### 4. Load MCP Tools in the Graph

```typescript
// backend/src/agent/mcp-memory.ts (new file)
import { MultiServerMCPClient } from "@langchain/mcp-adapters";

export async function getRedisMemoryTools() {
  const client = new MultiServerMCPClient({
    mcpServers: {
      memory: {
        transport: "sse",
        url: process.env.REDIS_MCP_URL || "http://localhost:9000/sse",
        headers: {},
      },
    },
    onConnectionError: "ignore", // optional: don't fail graph if MCP is down
  });
  return client.getTools();
}
```

> **Note**: Redis MCP tools are session/user-agnostic at the transport level. Session and user scoping are typically passed as tool arguments when calling memory operations (see Redis docs for `session_id`, `user_id`).

### 5. Wire Tools into the Graph

```typescript
// backend/src/agent/graph.ts
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { getRedisMemoryTools } from "./mcp-memory.js";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: ENV.GOOGLE_API_KEY,
});

// Load MCP tools (session/user from state or config)
const memoryTools = await getRedisMemoryTools("session_1", "user_1");
const allTools = [...memoryTools]; // add search, etc.

const compiledGraph = createReactAgent({
  llm,
  tools: allTools,
});
```

### 6. Environment Variables

Add to `backend/.env`:

```env
# Existing
LANGGRAPH_DEPLOYMENT_URL=http://127.0.0.1:2024
GOOGLE_API_KEY=your_key

# Redis Agent Memory
REDIS_MCP_URL=http://localhost:9000/sse
REDIS_URL=redis://localhost:6379
```

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

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `docs/plan.md` | Created (this file) |
| `backend/src/agent/mcp-memory.ts` | Create – MCP client + tool loading |
| `backend/src/agent/graph.ts` | Modify – ReAct agent + memory tools |
| `backend/package.json` | Add `@langchain/mcp-adapters` |
| `backend/.env` | Add `REDIS_MCP_URL`, `REDIS_URL` |
| `backend/src/config/env.ts` | Add new env vars |

---

## References

- [Redis Agent Memory Server – Getting Started](https://redis.github.io/agent-memory-server/getting-started/)
- [Redis Agent Memory – LangChain Integration](https://redis.github.io/agent-memory-server/langchain-integration/) (Python)
- [LangGraph MCP – Server MCP](https://langchain-ai.github.io/langgraph/concepts/server-mcp/)
- [@langchain/mcp-adapters (npm)](https://www.npmjs.com/package/@langchain/mcp-adapters)
- [CopilotKit + LangGraph](docs/copilotkit/copilotkit-langgraph.md)
- [CopilotKit UI](docs/copilotkit/copilotkit-ui.md)
