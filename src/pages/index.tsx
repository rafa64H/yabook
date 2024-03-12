import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/main.css";
import Header from "../components/header";
import { Provider } from "react-redux";
import { store } from "../services/redux/store";
import LoadingWholePage from "../components/loadingWholePage";
import { useAppSelector } from "../hooks/hooks";
const Page = () => {
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
