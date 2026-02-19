```sh
npm i @langchain/langgraph @langchain/core zod  @google/genai
npm i @copilotkit/runtime
npm i -D @langchain/langgraph-cli
```

Added an npm override in backend/package.json so a single version of @ag-ui/client is used:

```json title="backend/package.json"
"overrides": {
    "@ag-ui/client": "0.0.43"
}
```

The error came from having two copies of @ag-ui/client: one at 0.0.43 (from @copilotkit/runtime, used by LangGraphAgent) and one at 0.0.42 (nested under @copilotkitnext/shared and used by AbstractAgent).

```sh
LANGGRAPH_DEPLOYMENT_URL=http://127.0.0.1:2024
GEMINI_API_KEY=your_key_here
```

```json title="langgraph.json"
{
  "node_version": "20",
  "graphs": {
    "starterAgent": "./src/agent/graph.ts:starterAgent"
  },
  "env": ".env"
}
```

```js title="src/agent/graph.ts"
import "dotenv/config";
import { StateGraph } from "@langchain/langgraph";
import { z } from "zod";
import { AIMessage } from "@langchain/core/messages";
import { GoogleGenAI } from "@google/genai";

// ---- State schema (LangGraph will store/stream this) ----
const StateSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    })
  ),
});

type State = z.infer<typeof StateSchema>;

// ---- Gemini client ----
//Take from env.ts
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Gemini grounding tool config (Google Search) :contentReference[oaicite:4]{index=4}
const groundingTool = { googleSearch: {} };

async function geminiGroundedAnswer(userText: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: userText,
    config: {
      tools: [groundingTool],
    },
  });

  // response.text is the model output; groundingMetadata is available in raw response
  // Keep it simple: return text.
  return response.text ?? "(No response text returned.)";
}

// ---- Graph node ----
async function llmNode(state: State) {
  const last = [...state.messages].reverse().find((m) => m.role === "user");
  const userText = last?.content ?? "Hello!";

  const answer = await geminiGroundedAnswer(userText);

  return {
    messages: [
      ...state.messages,
      { role: "assistant" as const, content: answer },
    ],
  };
}

// ---- Export graph ----
export const starterAgent = new StateGraph(StateSchema)
  .addNode("llm", llmNode)
  .addEdge("__start__", "llm")
  .addEdge("llm", "__end__")
  .compile();

```

```sh
# run the langgraph server (separate langgraph server as it has streaming and other protocol support)
npx @langchain/langgraph-cli dev

```

It will print something like API: http://127.0.0.1:2024 (default)

```js title="src/app.ts"
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNodeHttpEndpoint,
} from "@copilotkit/runtime";

import { LangGraphAgent } from "@copilotkit/runtime/langgraph";

const app = express();
app.use(express.json({ limit: "2mb" }));

// If Next.js runs on :3000 and this runs on :4000
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// CopilotKit runtime + LangGraph agent wiring :contentReference[oaicite:8]{index=8}
const serviceAdapter = new ExperimentalEmptyAdapter();

const runtime = new CopilotRuntime({
  agents: {
    // agentId used by the frontend
    starterAgent: new LangGraphAgent({
      deploymentUrl:
        process.env.LANGGRAPH_DEPLOYMENT_URL || "http://127.0.0.1:2024",
      graphId: "starterAgent", // must match langgraph.json key
      langsmithApiKey: process.env.LANGSMITH_API_KEY || "",
    }),
  },
});

app.post("/copilotkit", (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    const handler = copilotRuntimeNodeHttpEndpoint({
      endpoint: "/copilotkit",
      runtime,
      serviceAdapter,
    });

    return handler(req, res);
  })().catch(next);
});

app.get("/health", (_req, res) => res.json({ ok: true }));

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`Express runtime listening: http://localhost:${port}/copilotkit`);
});

```
