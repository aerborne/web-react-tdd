import React from "react";
import ReactDOM from "react-dom/client";
import RouteHandler from "./components/route-handler";
import "./scss/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouteHandler />
  </React.StrictMode>
);
