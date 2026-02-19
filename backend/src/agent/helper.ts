import { HumanMessage, type BaseMessage } from "@langchain/core/messages";

// Helper: get string content from a LangChain message (CopilotKit/LangGraph expect this)
function getMessageText(message: BaseMessage): string {
  let result = "";
  const c = message.content;
  if (typeof c === "string") {
    result = c;
  } else if (Array.isArray(c)) {
    for (const p of c) {
      if (typeof p === "string") {
        result = p;
        break;
      }
      const part = p as { text?: string };
      if (part?.text) {
        result = part.text;
        break;
      }
    }
  }
  return result;
}

function isHumanMessage(m: BaseMessage): boolean {
  const isHuman =
    m instanceof HumanMessage ||
    (m as BaseMessage & { _getType?: () => string })._getType?.() === "human";
  return isHuman;
}

// Get text of the most recent user (human) message.
function getLastUserText(messages: BaseMessage[]): string {
  const fromEnd = [...messages].reverse();
  const lastHuman = fromEnd.find(isHumanMessage) ?? fromEnd[0];
  return lastHuman ? getMessageText(lastHuman as BaseMessage) : "Hello!";
}

export { getLastUserText };
