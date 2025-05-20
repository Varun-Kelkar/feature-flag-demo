import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";
import "./index.css";
import { RouterProvider } from "react-router";
import { routes } from "./routes.tsx";
import { LDProvider } from "launchdarkly-react-client-sdk";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LDProvider clientSideID={import.meta.env.VITE_LAUNCH_DARKLY_CLIENT_ID}>
      <RouterProvider router={routes} />
    </LDProvider>
  </StrictMode>
);
