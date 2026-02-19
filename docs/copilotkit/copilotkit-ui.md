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
