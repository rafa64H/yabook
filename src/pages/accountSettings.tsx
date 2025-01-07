import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/main.css";
import Header from "../components/header";
import { Provider } from "react-redux";
import { store } from "../services/redux/store";
import { useAppSelector } from "../hooks/hooks";
import LoadingWholePage from "../components/loadingWholePage";
import SettingsAccount from "../components/settingsAccount";
const AccountSettingsPage = () => {
  const user = useAppSelector((store) => store.auth.user);

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
      <SettingsAccount></SettingsAccount>
    </>
  );
};

export default AccountSettingsPage