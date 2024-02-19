import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/main.css";
import Header from "../components/header";
import SignInForm from "../components/signInForm";
import { Provider } from "react-redux";
import { store } from "../services/redux/store";
const Page = () => {
  return (
    <>
      <Header></Header>
      <section className="bg-gray-300 font-robotoSlab text-2xl text-firstColor">
        <SignInForm></SignInForm>
      </section>
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
