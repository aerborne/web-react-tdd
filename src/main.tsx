import React from "react";
import ReactDOM from "react-dom/client";
import RouteHandler from "./components/route-handler";
// import { RouterProvider } from "react-router-dom";
import "./scss/index.scss";
import Layout from "./components/Layout";
import ContextFeeder from "./components/context/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ContextFeeder>
    <Layout>
      <RouteHandler />
    </Layout>
  </ContextFeeder>
  // </React.StrictMode>
);
