import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/main.css";
import Header from "../components/header";
import SignUpForm from "../components/signUpForm";
import { Provider } from "react-redux";
import { store } from "../services/redux/store";
import LoadingWholePage from "../components/loadingWholePage";
import { useAppSelector } from "../hooks/hooks";

const SignUpPage = () => {
  return (
    <>
      <Header></Header>
      <section className="bg-gray-300 font-robotoSlab text-2xl text-firstColor">
        <SignUpForm></SignUpForm>
      </section>
    </>
  );
};

export default SignUpPage