import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/main.css";
import Header from "../components/header";
import SignInForm from "../components/signInForm";

const Page = () => {
  return (
    <>
      <Header loggedIn={false}></Header>
      <section className="bg-fifthColor font-robotoSlab text-2xl">
        <SignInForm></SignInForm>
      </section>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page></Page>
  </React.StrictMode>,
);
