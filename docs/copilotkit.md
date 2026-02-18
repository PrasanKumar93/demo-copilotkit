[ref](https://docs.copilotkit.ai/direct-to-llm/guides/quickstart?copilot-hosting=self-hosted&endpoint-type=Node.js+Express)

## Backend

```sh
npm install @copilotkit/runtime
```

- create [API key](https://aistudio.google.com/app/api-keys)

```sh
GOOGLE_API_KEY=your_api_key_here
```

```js
import type { Request, Response } from "express";
import {
  CopilotRuntime,
  copilotRuntimeNodeHttpEndpoint,
} from "@copilotkit/runtime";
import type { CopilotServiceAdapter } from "@copilotkit/runtime";
import { randomUUID } from "@copilotkit/shared";

import { ENV } from "./config/env.js";

export const COPILOTKIT_ENDPOINT = "/copilotkit";

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


```

```js
import express from "express";
import { handleCopilotKit } from "./copilotkit.js";

const app = express();
//...

app.use(COPILOTKIT_ENDPOINT, async (req, res, next) => {
  // Express sets req.url to the path after the mount ("/" for /copilotkit).
  // CopilotKit's handler builds the request URL from req.url; its Hono app has basePath(COPILOTKIT_ENDPOINT)
  // and only matches when the path starts with that. Restore the full path so the handler can route.
  req.url = COPILOTKIT_ENDPOINT + (req.url === "/" ? "" : req.url);

  try {
    await handleCopilotKit(req, res);
  } catch (err) {
    next(err);
  }
});

//...
```

## Frontend

```sh
npm install @copilotkit/react-ui @copilotkit/react-core
```

Configure the CopilotKit Provider

```jsx title="frontend/src/app/layout.tsx"
import "./globals.css";
import { ReactNode } from "react";
import { CopilotKit } from "@copilotkit/react-core";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Make sure to use the URL you configured in the previous step  */}
        <CopilotKit runtimeUrl="http://localhost:3001/copilotkit">
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}
```

- copilot as sidebar of app

```jsx
import { CopilotSidebar } from "@copilotkit/react-ui";

export function YourApp() {
  return (
    <CopilotSidebar
      defaultOpen={true}
      instructions={
        "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
      }
      labels={{
        title: "Sidebar Assistant",
        initial: "How can I help you today?",
      }}
    >
      <YourMainContent />
    </CopilotSidebar>
  );
}
```
