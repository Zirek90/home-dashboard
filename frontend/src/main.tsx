import { StrictMode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { queryClient } from "./api/query-client";
import { App } from "./App";
import { AuthProvider, NotificationProvider, ThemeProvider } from "./providers";
// Import the generated route tree
import "./index.css";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <ThemeProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ThemeProvider>
        </NotificationProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>
  );
}
