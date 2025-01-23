import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/main.css";
import Header from "../components/header";
import { Provider } from "react-redux";
import type { RootState } from "../services/redux/store";
import { store } from "../services/redux/store";
import LoadingWholePage from "../components/loadingWholePage";
import { useAppSelector } from "../hooks/hooks";
const HomePage = () => {
  const user = useAppSelector((store: RootState) => store.auth.user);

  return (
    <>
      <Header></Header>
      {user.uid === null ? <LoadingWholePage></LoadingWholePage> : <></>}
    </>
  );
};

export default HomePage;
