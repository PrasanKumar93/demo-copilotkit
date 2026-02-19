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
