import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.scss";
import ThemeProvider from "@/components/ui/ThemeProvider/ThemeProvider";
import { Header, Footer } from "@/components/layout";

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
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider>
            <div className="app-container">
              <Header />
              <main className="main-content">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
