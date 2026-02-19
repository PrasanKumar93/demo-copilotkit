# Comparison: LangGraph/LangChain + CopilotKit vs LangGraph/LangChain + assistant-ui

Short comparison for choosing a **frontend/runtime layer** when your backend is (or will be) **LangGraph/LangChain** with **audio/video/text**, **custom RAG**, and **tool calling**.

---

## Your stated requirements

- **Audio / video / text** messages (input and/or output).
- **Custom RAG** in the backend (your own retrieval, vectors, etc.).
- **Tool calling** (e.g. search, APIs) with streaming.
- General flexibility for multimodal and future features.

---

## Overview

| Aspect            | **CopilotKit**                                                                                                              | **assistant-ui**                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **What it is**    | Agentic framework for in-app AI copilots; GraphQL runtime; multi-agent, multi-backend.                                      | React toolkit for AI chat UIs; designed around LangGraph (Cloud or self-hosted).                                                 |
| **Backend model** | You run your own backend (Express, FastAPI, etc.); CopilotKit connects via a single endpoint and optional remote endpoints. | Expects a **LangGraph API** (LangGraph Cloud or your own LangGraph server). Frontend talks to that API (often via a thin proxy). |
| **LangGraph fit** | Use LangGraph inside your backend; expose it via CopilotKit’s adapter/remote endpoint.                                      | First-class: built for LangGraph; `@assistant-ui/react-langgraph`, thread/stream contracts align with LangGraph.                 |

---

## Requirement-by-requirement

### 1. Audio / video / text messages

| Requirement      | CopilotKit                                                                                                             | assistant-ui                                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Text**         | ✅ Primary: streaming text, markdown, tool calls, generative UI.                                                       | ✅ Primary: streaming text, markdown, code, tables.                                                                                                             |
| **Audio input**  | ✅ Via **your endpoints**: `transcribeAudioUrl` (e.g. Whisper or any STT). You own the backend.                        | ✅ **Dictation** (speech-to-text) guide; you wire to your STT or use their example.                                                                             |
| **Audio output** | ✅ Via **your endpoint**: `textToSpeechUrl` (e.g. TTS API). You own the backend.                                       | ⚠️ Not a built-in feature; you’d add TTS in your UI (e.g. call your TTS API when a message is done).                                                            |
| **Video**        | ⚠️ No dedicated “video message” primitive in docs; you can send URLs or use **generative UI** to render video players. | ⚠️ No built-in video adapter; **attachments** support images + text; **custom attachment adapters** can be added for video (e.g. upload + send URL to backend). |

**Summary**: Both support text and audio input (with you providing STT). CopilotKit has an explicit TTS hook (`textToSpeechUrl`). Video is “custom” in both: CopilotKit via GenUI/URLs, assistant-ui via custom attachment adapters.

---

### 2. Custom RAG in the backend

| Aspect                  | CopilotKit                                                                                                                 | assistant-ui                                                                                                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Where RAG runs**      | In **your** backend (Node, Python, etc.). CopilotKit only sends messages and streams back; it doesn’t care how you do RAG. | In **your LangGraph graph**: e.g. a RAG tool or a dedicated node that calls your vector DB/API. assistant-ui just sends messages and streams state; it doesn’t implement RAG. |
| **Documented patterns** | Blog posts/docs: e.g. MongoDB Vector Search, Pinecone, “knowledge-based RAG copilot”; custom backend is the norm.          | No “RAG product”; you implement retrieval inside the graph (tools or nodes) and stream results as messages/tool calls.                                                        |
| **Flexibility**         | ✅ Any stack (Express + LangChain/LangGraph, FastAPI, etc.); RAG is entirely under your control.                           | ✅ Full control inside LangGraph (same idea: your code, your vector store, your prompts).                                                                                     |

**Summary**: Both support **custom RAG in the backend**. With CopilotKit the “backend” is your Express/FastAPI app (which can run LangGraph + RAG). With assistant-ui the “backend” is your LangGraph server, and RAG lives inside the graph. No meaningful difference for “custom RAG in backend.”

---

### 3. Tool calling

| Aspect              | CopilotKit                                                                    | assistant-ui                                                                                          |
| ------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Support**         | ✅ Tool calls over the wire; streaming; optional human-in-the-loop.           | ✅ Streaming tool calls; generative UI for tool results; human-in-the-loop (e.g. approve before run). |
| **Where tools run** | In your backend (e.g. inside your LangGraph/LangChain agent).                 | Inside your LangGraph graph (tools bound to the model in the graph).                                  |
| **UI**              | Tool calls and results can drive **Generative UI** (custom React components). | Tool calls can map to **custom UI components** (generative UI).                                       |

**Summary**: Both support **tool calling** and streaming; tools are implemented in your backend/graph. Either is suitable for “tool calling.”

---

### 4. Multimodal input (images, files)

| Aspect              | CopilotKit                                                                    | assistant-ui                                                                                            |
| ------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Images**          | Supported in chat/attachments; can be sent to vision models via your backend. | **Attachments**: image adapter (e.g. data URL); **VisionImageAdapter** example for vision-capable LLMs. |
| **Files (generic)** | Can be handled via your API and passed into context/tools.                    | **CompositeAttachmentAdapter**; **custom adapters** for other types (e.g. audio/video).                 |

**Summary**: Both support images and extensible file handling; assistant-ui documents attachment adapters explicitly; CopilotKit relies on your backend and GenUI.

---

### 5. Backend and deployment

| Aspect           | CopilotKit                                                                                              | assistant-ui                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Backend**      | **Your server** (Express, FastAPI, etc.) at one endpoint; can proxy to other services (e.g. LangGraph). | **LangGraph API** (LangGraph Cloud or self-hosted LangGraph server). You can run LangGraph in your own Node/Python stack. |
| **Protocol**     | GraphQL-based runtime; one CopilotKit endpoint.                                                         | REST/streaming to LangGraph API; `runs.stream`, threads, etc.                                                             |
| **Self-hosting** | ✅ Fully self-hosted: frontend + your backend; no required SaaS.                                        | ✅ Self-hosted possible: run LangGraph server yourself and point assistant-ui at it.                                      |

**Summary**: Both can be fully self-hosted. CopilotKit is “bring your own backend (any shape)”; assistant-ui is “bring a LangGraph API.”

---

### 6. Generative UI (GenUI)

| Aspect | CopilotKit | assistant-ui |
|--------|------------|--------------|
| **Supported?** | ✅ Yes | ✅ Yes |
| **Mechanism** | `useCopilotAction({ name, parameters, render, handler })` – agent triggers actions; `render` returns a React component; optional `handler` for side effects. | `makeAssistantToolUI({ toolName, render })` – map a **tool name** (from LangGraph) to a React component. Component receives `args`, `result`, `status` (`running` / `complete` / `incomplete` / `requires_action`), `argsText`. |
| **Scope** | **Tool-result UI** + **agent-driven UI** beyond tools: static (pre-built components), declarative (JSON spec → UI), open-ended (MCP Apps / iframes). | **Tool-call UI only**: one custom component per tool; great for visualizing tool execution and results. |
| **Side effects** | Actions can have a `handler` (e.g. update app state, write to DB) in addition to `render`. | Focus is on **display**; side effects live in the backend (your graph). |

**Summary**: assistant-ui **does support GenUI** for tool calls (custom React components per tool, with status and args/result). CopilotKit goes further with multiple GenUI patterns (JSON-driven UI, MCP Apps) and frontend-side action handlers.

---

### 7. Extra considerations

| Aspect                | CopilotKit                                                              | assistant-ui                                                                                                                |
| --------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Multi-agent**       | ✅ First-class: multiple agents, routing, different backends per agent. | Focused on one LangGraph app/assistant per runtime; multi-agent via multiple runtimes or graphs.                            |
| **Human-in-the-loop** | ✅ Supported (e.g. approve actions).                                    | ✅ Supported (interrupts, approval flows).                                                                                  |
| **Thread / history**  | Your backend manages threads; CopilotKit sends thread id and messages.  | Threads via LangGraph (e.g. `threads.create`, `getState`); assistant-ui has `create`/`load` and optional Cloud persistence. |
| **Ecosystem**         | Broader: many runtimes, CoAgents, MCP; not tied to one graph runtime.   | Tighter LangGraph alignment: same mental model as LangGraph (threads, runs, stream modes).                                  |

---

### 8. What’s missing in assistant-ui (vs CopilotKit) — major gaps

| Gap | What CopilotKit has | What assistant-ui has / workaround |
|-----|---------------------|------------------------------------|
| **GenUI beyond tool results** | Declarative UI (agent sends JSON → frontend renders), MCP Apps (sandboxed iframe apps). | Only tool-call → custom component. No built-in JSON-driven or iframe-based GenUI. |
| **Built-in voice (TTS)** | `textToSpeechUrl` – one prop to plug your TTS endpoint. | No built-in hook; you add TTS in your UI (e.g. call your API when a message completes). |
| **Multi-agent / multi-backend** | First-class: multiple agents, routing, different backends per agent from one frontend. | One LangGraph API per runtime; multi-agent = multiple runtimes or one graph with routing. |
| **Frontend action handlers** | `useCopilotAction` can define a `handler` that runs in the browser (e.g. update state, call APIs). | Tool execution is in the backend (graph); no first-class “frontend action” with side effects. |
| **Protocol / backend flexibility** | GraphQL runtime; any backend (Express, FastAPI, Lambda); remote endpoints. | Expects a LangGraph API (threads + runs/stream). Tied to that contract. |

None of these make assistant-ui “missing” for a standard chat + tool-call UI; they matter if you need multi-agent, declarative/iframe GenUI, or built-in voice/TTS out of the box.

---

### 9. Integrating with Vercel AI SDK, Google SDK, or other SDKs

| Aspect | CopilotKit | assistant-ui |
|--------|------------|--------------|
| **Designed for** | Multiple backends and SDKs behind one runtime. | A **single** backend contract: the **LangGraph API** (threads + runs/stream). |
| **Vercel AI SDK** | You can use Vercel AI SDK in your backend and expose it via a CopilotKit **remote endpoint** or custom adapter; the runtime talks to your endpoint. | No built-in adapter. To use Vercel AI SDK you need a **LangGraph server** that uses it inside a graph node, or a custom bridge that speaks the LangGraph API and calls Vercel under the hood. |
| **Google (Gemini) SDK** | **GoogleGenerativeAIAdapter** plugs in directly; or your backend uses Google and CopilotKit talks to that backend. | No adapter. Google is used **inside** your LangGraph graph (e.g. LangChain `@langchain/google-genai` in a node). assistant-ui only sees the LangGraph API. |
| **Other SDKs / backends** | Adapters and **remoteEndpoints**: point at any URL (FastAPI, Lambda, custom Express). One frontend can switch agents/backends. | Only "backend" is a service that implements the LangGraph API. Any other SDK (OpenAI, Anthropic, custom) must be used inside that LangGraph server. |

**Summary**: **assistant-ui cannot be integrated with Vercel AI SDK, Google SDK, or other SDKs as easily as CopilotKit.** It has one integration point: a server that implements the LangGraph API (threads, runs, stream). To use another SDK you run it inside that server (e.g. inside your graph). CopilotKit is built to sit in front of many backends and SDKs via adapters and remote endpoints, so swapping or combining Vercel, Google, or a custom API is straightforward from the frontend.

---

## Recommendation relative to your requirements

- **Audio / video / text**:
  - **CopilotKit** has explicit voice hooks (`transcribeAudioUrl`, `textToSpeechUrl`); good if you want a single place to plug STT/TTS.
  - **assistant-ui** has dictation and attachments; TTS and video need a bit more custom wiring.

- **Custom RAG in backend**:  
  **Equal**: implement RAG in your backend (CopilotKit) or inside your LangGraph graph (assistant-ui).

- **Tool calling**:  
  **Equal**: both support streaming tool calls and generative UI.

- **Full-stack JS (Node + React)**:
  - **CopilotKit**: You already have Express + CopilotKit; adding LangGraph.js (or a LangGraph API) behind the same endpoint fits well.
  - **assistant-ui**: Best if you’re committed to “a LangGraph API” (Node or Python) and want a UI that’s designed for that contract.

**Practical takeaway**:

- Prefer **CopilotKit** if you want: a single “copilot” endpoint, multi-agent/multi-backend flexibility, and the **built-in voice URLs** for audio in/out, while keeping custom RAG and tool calling in your Node (or other) backend.
- Prefer **assistant-ui** if you want: a **LangGraph-native** React UI (threads, stream modes, interrupts) and are fine wiring audio/video yourself (custom adapters, TTS in UI).

---

## Summary table (your requirements)

| Requirement                 | CopilotKit                     | assistant-ui                    |
| --------------------------- | ------------------------------ | ------------------------------- |
| Text messages + streaming   | ✅                             | ✅                              |
| Audio input (STT)           | ✅ (your `transcribeAudioUrl`) | ✅ (dictation / your STT)       |
| Audio output (TTS)          | ✅ (your `textToSpeechUrl`)    | ⚠️ Custom (e.g. your TTS in UI) |
| Video in/out                | ⚠️ GenUI / URLs / custom       | ⚠️ Custom attachment adapters   |
| Custom RAG in backend       | ✅ Your backend                | ✅ Inside LangGraph graph       |
| Tool calling                | ✅                             | ✅                              |
| Self-hosted, Node-friendly  | ✅                             | ✅ (with LangGraph API)         |
| Multi-agent / multi-backend | ✅ Strong                      | ⚠️ Possible but not central     |

## For **audio/video/text + custom RAG + tool calling** on a **Node/JS stack**, **CopilotKit** has a slight edge on **audio** (built-in URL hooks) and **multi-backend**; **assistant-ui** has a slight edge if you want the **most direct LangGraph integration** and are okay adding TTS/video yourself.
