import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/main.css";
import Header from "../components/header";

const Page = () => {
  return (
    <>
      <Header loggedIn={false}></Header>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page></Page>
  </React.StrictMode>,
);
