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
