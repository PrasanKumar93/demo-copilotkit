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
    "starterAgent": "./src/agent/graph.ts:compiledGraph"
  },
  "env": ".env"
}
```

```js title="src/agent/graph.ts"
import {
  MessagesAnnotation,
  StateGraph,
  START,
  END,
  type CompiledStateGraph,
} from "@langchain/langgraph";
import { AIMessage, type BaseMessage } from "@langchain/core/messages";
import { GoogleGenAI } from "@google/genai";

import { ENV } from "../config/env.js";
import { getLastUserText } from "./helper.js";

type CompiledGraphType = CompiledStateGraph<
  State,
  { messages: BaseMessage[] },
  string
>;

const geminiAiClient = new GoogleGenAI({ apiKey: ENV.GOOGLE_API_KEY });
const groundingTool = { googleSearch: {} };

const geminiGroundedAnswer = async (userText: string) => {
  const response = await geminiAiClient.models.generateContent({
    model: "gemini-2.5-flash",
    contents: userText,
    config: { tools: [groundingTool] },
  });
  return response.text ?? "(No response text returned.)";
};

type State = { messages: BaseMessage[] };

const llmNode = async (state: State) => {
  const messages = state.messages ?? [];
  const userText = getLastUserText(messages);

  const answer = await geminiGroundedAnswer(userText);
  return { messages: [new AIMessage(answer)] };
};

const starterAgentGraph = new StateGraph(MessagesAnnotation)
  .addNode("llm", llmNode)
  .addEdge(START, "llm")
  .addEdge("llm", END);

const compiledGraph = starterAgentGraph.compile() as CompiledGraphType;

export { compiledGraph };

```

```sh
# run the langgraph server (separate langgraph server as it has streaming and other protocol support)
npx @langchain/langgraph-cli dev

```

It will print something like API: http://127.0.0.1:2024 (default)

```js title="src/agent/copilotkit-langgraph.ts"
import type { Request, Response } from "express";

import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNodeHttpEndpoint,
} from "@copilotkit/runtime";

import { LangGraphAgent } from "@copilotkit/runtime/langgraph";
import { ENV } from "../config/env.js";
import { COPILOTKIT_ENDPOINT } from "../constants/general.js";

// CopilotKit runtime + LangGraph agent wiring
const serviceAdapter = new ExperimentalEmptyAdapter();

const langGraphAgentConfig = {
  deploymentUrl: ENV.LANGGRAPH_DEPLOYMENT_URL || "",
  graphId: "starterAgent", // must match langgraph.json key
  langsmithApiKey: ENV.LANGSMITH_API_KEY || "",
};

const runtime = new CopilotRuntime({
  agents: {
    // LangGraph agent config; frontend uses agent id "default"
    default: new LangGraphAgent(langGraphAgentConfig),
  },
});

async function handleCopilotKitLanggraph(req: Request, res: Response) {
  const handler = copilotRuntimeNodeHttpEndpoint({
    endpoint: COPILOTKIT_ENDPOINT,
    runtime,
    serviceAdapter,
  });
  return handler(req, res);
}

export { handleCopilotKitLanggraph };


```

```js title="src/app.ts"
import express from "express";
import { handleCopilotKitLanggraph } from "./agent/copilotkit-langgraph.js";

const app = express();
//...

app.use(COPILOTKIT_ENDPOINT, async (req, res, next) => {
  // Express sets req.url to the path after the mount ("/" for /copilotkit).
  // CopilotKit's handler builds the request URL from req.url; its Hono app has basePath(COPILOTKIT_ENDPOINT)
  // and only matches when the path starts with that. Restore the full path so the handler can route.
  req.url = COPILOTKIT_ENDPOINT + (req.url === "/" ? "" : req.url);

  try {
    await handleCopilotKitLanggraph(req, res);
  } catch (err) {
    next(err);
  }
});

export default app;
```
