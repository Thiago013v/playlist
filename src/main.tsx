import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { PlaylistContextProvider } from "./contexts/PlayListContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PlaylistContextProvider>
      <App />
    </PlaylistContextProvider>
  </StrictMode>,
);
