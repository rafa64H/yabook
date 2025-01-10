import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/main.css";
import Header from "../components/header";
import SignUpForm from "../components/signUpForm";
import { Provider } from "react-redux";
import { type RootState, store } from "../services/redux/store";
import LoadingWholePage from "../components/loadingWholePage";
import { useAppSelector } from "../hooks/hooks";

const SignUpPage = () => {
  const user = useAppSelector((store: RootState) => store.auth.user);
  return (
    <>
      <Header></Header>
      <section className="bg-gray-300 font-robotoSlab text-2xl text-firstColor">
        <SignUpForm></SignUpForm>
      </section>
    </>
  );
};

export default SignUpPage;
