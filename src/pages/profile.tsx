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
import type {
  FirestoreData,
  FirestoreFriendsOnlyData,
} from "../types/user-types";
import { getFriendsOnlyInformationOfUser } from "../services/firebase/utils/user-related/getFriendsOnlyInfoUser";
const ProfilePage = () => {
  const user = useAppSelector((store) => store.auth.user);
  const [publicFirestoreDataOfUser, setPublicFirestoreDataOfUser] =
    React.useState<FirestoreData | undefined | null>(null);
  const [friendsOnlyFirestoreDataOfUser, setFriendsOnlyFirestoreDataOfUser] =
    React.useState<
      FirestoreFriendsOnlyData | "missing-permissions" | undefined | null
    >(null);

  const url = new URL(window.location.href);
  const uidParam = url.searchParams.get("uid");

  useEffect(() => {
    if (uidParam) {
      const publicData = getPublicInformationOfUser(uidParam).then(
        (publicData) => {
          setPublicFirestoreDataOfUser(publicData);
          console.log(publicData);
        },
      );

      const friendsOnlyData = getFriendsOnlyInformationOfUser(uidParam).then(
        (friendsOnlyData) => {
          setFriendsOnlyFirestoreDataOfUser(friendsOnlyData);
        },
      );
    }
  }, []);

  if (
    user.uid === null ||
    (user.uid === uidParam &&
      publicFirestoreDataOfUser === null &&
      friendsOnlyFirestoreDataOfUser === null)
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
        friendsOnlyFirestoreDataOfUser={friendsOnlyFirestoreDataOfUser}
      ></ProfileInfo>
    </>
  );
};

export default ProfilePage