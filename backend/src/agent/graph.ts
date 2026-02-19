import {
  MessagesAnnotation,
  StateGraph,
  START,
  END,
  type CompiledStateGraph,
} from "@langchain/langgraph";
import { AIMessage, HumanMessage, type BaseMessage } from "@langchain/core/messages";
import { GoogleGenAI } from "@google/genai";

import { ENV } from "../config/env.js";

// Helper: get string content from a LangChain message (CopilotKit/LangGraph expect this)
function getMessageText(message: BaseMessage): string {
  const c = message.content;
  if (typeof c === "string") return c;
  if (Array.isArray(c)) {
    for (const p of c) {
      if (typeof p === "string") return p;
      const part = p as { text?: string };
      if (part?.text) return part.text;
    }
  }
  return "";
}

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
  const lastHuman =
    [...messages].reverse().find(
      (m) =>
        m instanceof HumanMessage ||
        (m as BaseMessage & { _getType?: () => string })._getType?.() === "human"
    ) ?? messages[messages.length - 1];
  const userText = lastHuman ? getMessageText(lastHuman as BaseMessage) : "Hello!";

  const answer = await geminiGroundedAnswer(userText);
  return { messages: [new AIMessage(answer)] };
};

const starterAgentGraph = new StateGraph(MessagesAnnotation)
  .addNode("llm", llmNode)
  .addEdge(START, "llm")
  .addEdge("llm", END);

const compiledGraph = starterAgentGraph.compile() as CompiledStateGraph<
  State,
  { messages: BaseMessage[] },
  string
>;

export { compiledGraph };
