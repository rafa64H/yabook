import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../assets/main.css";
import Header from "../components/header";
import SignInForm from "../components/signInForm";
import { Provider } from "react-redux";
import { store } from "../services/redux/store";
import ProfileInfo from "../components/profileInfo";
import LoadingWholePage from "../components/loadingWholePage";
import { useAppSelector } from "../hooks/hooks";
import { getPublicInformationOfUser } from "../services/firebase/utils/user-related/getPublicInfoUser";
import type { FirestoreData } from "../types/user-types";
const Page = () => {
  const user = useAppSelector((store) => store.auth.user);
  const [publicFirestoreDataOfUser, setPublicFirestoreDataOfUser] =
    React.useState<FirestoreData | undefined | null>(null);

  const url = new URL(window.location.href);
  const uidParam = url.searchParams.get("uid");

  useEffect(() => {
    if (uidParam) {
      const data = getPublicInformationOfUser(uidParam).then((data) => {
        setPublicFirestoreDataOfUser(data);
        console.log(data);
      });
    }
  }, []);

  if (
    user.uid === null ||
    (user.uid === uidParam && publicFirestoreDataOfUser === null)
  ) {
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
      <ProfileInfo
        uidUrlParam={uidParam}
        publicFirestoreDataOfUser={publicFirestoreDataOfUser}
      ></ProfileInfo>
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
