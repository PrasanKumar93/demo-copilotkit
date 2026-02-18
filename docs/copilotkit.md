[ref](https://docs.copilotkit.ai/direct-to-llm/guides/quickstart?copilot-hosting=self-hosted&endpoint-type=Node.js+Express)

## Backend

```sh
npm install @copilotkit/runtime
npm install @langchain/google-gauth
```

- create [API key](https://aistudio.google.com/app/api-keys)

```sh
GOOGLE_API_KEY=your_api_key_here
```

```js
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

```

```js
import express from "express";
import { handleCopilotKit } from "./copilotkit.js";

const app = express();
//...

app.use("/copilotkit", async (req, res, next) => {
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
