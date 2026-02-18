import type { Request, Response } from "express";
import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNodeHttpEndpoint,
} from "@copilotkit/runtime";

export const COPILOTKIT_ENDPOINT = "/copilotkit";

const serviceAdapter = new GoogleGenerativeAIAdapter({
  //  model: "gemini-2.5-flash-lite", //optional
});

async function handleCopilotKit(req: Request, res: Response) {
  const runtime = new CopilotRuntime();
  const copilotHandler = copilotRuntimeNodeHttpEndpoint({
    endpoint: COPILOTKIT_ENDPOINT,
    runtime,
    serviceAdapter,
  });
  return copilotHandler(req, res);
}

export { handleCopilotKit };
