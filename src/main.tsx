import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={router} />
    </DndProvider>
  </React.StrictMode>,
);
