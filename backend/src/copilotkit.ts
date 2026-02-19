import type { Request, Response } from "express";
import {
  CopilotRuntime,
  copilotRuntimeNodeHttpEndpoint,
} from "@copilotkit/runtime";
import type { CopilotServiceAdapter } from "@copilotkit/runtime";
import { randomUUID } from "@copilotkit/shared";

import { ENV } from "./config/env.js";
import { COPILOTKIT_ENDPOINT } from "./constants/general.js";

const DEFAULT_MODEL = "gemini-2.0-flash";

// BuiltInAgent reads process.env.GOOGLE_API_KEY; ensure it comes from our config.
if (ENV.GOOGLE_API_KEY) {
  process.env.GOOGLE_API_KEY = ENV.GOOGLE_API_KEY;
}

function createServiceAdapter(): CopilotServiceAdapter {
  return {
    provider: "google",
    model: DEFAULT_MODEL,
    name: "GoogleGeminiAdapter",
    async process(request) {
      const threadId = request.threadId ?? randomUUID();
      request.eventSource.stream(async (eventStream$) => {
        eventStream$.complete();
      });
      return { threadId };
    },
  };
}

function createRuntime() {
  return new CopilotRuntime();
}

function getCopilotHandler() {
  const runtime = createRuntime();
  const serviceAdapter = createServiceAdapter();
  return copilotRuntimeNodeHttpEndpoint({
    endpoint: COPILOTKIT_ENDPOINT,
    runtime,
    serviceAdapter,
  });
}

const copilotHandler = getCopilotHandler();

async function handleCopilotKit(req: Request, res: Response) {
  return copilotHandler(req, res);
}

export { handleCopilotKit };
