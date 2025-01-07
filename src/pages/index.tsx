import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/main.css";
import Header from "../components/header";
import { Provider } from "react-redux";
import type { RootState} from "../services/redux/store";
import { store } from "../services/redux/store";
import LoadingWholePage from "../components/loadingWholePage";
import { useAppSelector } from "../hooks/hooks";
const HomePage = () => {
  const user = useAppSelector((store: RootState) => store.auth.user);

  if (user.uid === null) {
    return (
      <>
        <Header></Header>
        <LoadingWholePage></LoadingWholePage>
      </>
    );
  }
  return (
    <>
      <Header></Header>
    </>
  );
};

export default HomePage