import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/main.css";
import Header from "../components/header";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header></Header>
  </React.StrictMode>,
);
