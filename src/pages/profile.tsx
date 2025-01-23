import React, { useContext, useEffect } from "react";
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
import type {
  FirestoreData,
  FirestoreFriendsOnlyData,
} from "../types/user-types";
import { getFriendsOnlyInformationOfUser } from "../services/firebase/utils/user-related/getFriendsOnlyInfoUser";
import { useParams } from "react-router-dom";
import {
  DifferentUserContext,
  EqualUidContext,
} from "../components/protected-routes/CheckProfileUid";
const ProfilePage = () => {
  const user = useAppSelector((store) => store.auth.user);
  const params = useParams();
  const equalUidToUser = useContext(EqualUidContext);

  const uidParam = params.uid;

  const { publicFirestoreDataOfUser, setPublicFirestoreDataOfUser } =
    useContext(DifferentUserContext);

  return (
    <>
      <Header></Header>
      {user.uid === null && !equalUidToUser ? (
        <LoadingWholePage></LoadingWholePage>
      ) : (
        <ProfileInfo uidUrlParam={uidParam!}></ProfileInfo>
      )}
    </>
  );
};

export default ProfilePage;
