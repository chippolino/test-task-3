import { createRoot } from "react-dom/client";
import "./shared/styles/_global.scss";
import { App } from "./app";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />,
  </StrictMode>,
);
