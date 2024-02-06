import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/main.css";
import Header from "../components/header";
import SignUpForm from "../components/signUpForm";

const Page = () => {
  return (
    <>
      <Header loggedIn={false}></Header>
      <section className="bg-fifthColor font-robotoSlab text-2xl">
        <SignUpForm></SignUpForm>
      </section>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page></Page>
  </React.StrictMode>,
);
