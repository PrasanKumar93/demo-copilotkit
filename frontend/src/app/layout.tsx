import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import "./globals.scss";
import ThemeProvider from "@/components/ui/ThemeProvider/ThemeProvider";
import { Header, Footer } from "@/components/layout";
import { COPILOTKIT_BASE_URL } from "@/lib/api";


const metadata: Metadata = {
  title: "StudentHub",
  description: "Student management application",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <CopilotKit runtimeUrl={COPILOTKIT_BASE_URL}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider>
              <div className="app-container">
                <Header />
                <main className="main-content">{children}</main>
                <Footer />
              </div>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </CopilotKit>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
