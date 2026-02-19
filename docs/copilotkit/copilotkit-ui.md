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
        <CopilotKit runtimeUrl="http://localhost:3001/copilotkit" showDevConsole=
          {false}>
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

type CopilotSidebarProps = ComponentProps<typeof CopilotSidebar>;

const copilotSidebarProps: CopilotSidebarProps = {
  defaultOpen: true,
  instructions: COPILOTKIT_CONSTANTS.INSTRUCTIONS,
  labels: {
    title: COPILOTKIT_CONSTANTS.LABELS.TITLE,
    initial: COPILOTKIT_CONSTANTS.LABELS.INITIAL,
  },
};

export function YourApp() {

  return (
     <CopilotSidebar {...copilotSidebarProps}>

      <YourMainContent />
    </CopilotSidebar>
  );
}
```

```css title="frontend/src/app/globals.scss"

```
