import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/main.css";
import Header from "../components/header";
import { Provider } from "react-redux";
import { store } from "../services/redux/store";
const Page = () => {
  return (
    <>
      <Header></Header>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Page></Page>
    </Provider>
  </React.StrictMode>,
);
