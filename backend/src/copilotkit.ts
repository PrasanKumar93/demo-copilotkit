import type { Request, Response } from "express";
import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNodeHttpEndpoint,
} from "@copilotkit/runtime";

const serviceAdapter = new GoogleGenerativeAIAdapter({
  //  model: "gemini-2.5-flash-lite", //optional
});

async function handleCopilotKit(req: Request, res: Response) {
  const runtime = new CopilotRuntime();
  const copilotHandler = copilotRuntimeNodeHttpEndpoint({
    endpoint: "/copilotkit",
    runtime,
    serviceAdapter,
  });
  return copilotHandler(req, res);
}

export { handleCopilotKit };
