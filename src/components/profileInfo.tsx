import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import type {
  FirestoreData,
  FirestoreFriendsOnlyData,
} from "../types/user-types";
import { Link } from "react-router-dom";

type Props = {
  uidUrlParam: string | null;
  publicFirestoreDataOfUser?: FirestoreData | null;
  friendsOnlyFirestoreDataOfUser?:
    | FirestoreFriendsOnlyData
    | "missing-permissions"
    | null;
};
function ProfileInfo({
  uidUrlParam,
  publicFirestoreDataOfUser,
  friendsOnlyFirestoreDataOfUser,
}: Props) {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();

  if (user.uid === uidUrlParam) {
    return (
      <section className="bg-secondColor font-robotoSlab text-xl text-firstColor">
        <div className="max-h-80 w-full overflow-hidden">
          <img
            src={user.firestoreData.backgroundImageUrl!}
            className="w-full object-cover"
            alt={`${user.displayName}'s background image`}
          ></img>
        </div>

        <div className="mx-4">
          <div className="flex items-start gap-2">
            <img
              className="max-w-16 rounded-full border-2 border-transparent transition-all duration-100 hover:border-thirdColor"
              src={user.photoURL!}
              alt={`${user.displayName} background`}
            />

            <div>
              <p>{user.displayName}</p>
              <p>{user.firestoreData.gender}</p>
              <p>
                {" "}
                Birth date: {user.firestoreData.birthMonth},{" "}
                {user.firestoreData.birthDay} of {user.firestoreData.birthYear}
              </p>
            </div>
            <Link to="/account-settings" className="ml-auto">
              <i className="fa-solid fa-cog"></i>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!uidUrlParam) {
    return <h1>Could not find user</h1>;
  }

  if (friendsOnlyFirestoreDataOfUser !== "missing-permissions") {
    return (
      <section className="bg-secondColor font-robotoSlab text-xl text-firstColor">
        <div className="max-h-80 w-full overflow-hidden">
          <img
            src={publicFirestoreDataOfUser!.backgroundImageUrl!}
            className="w-full object-cover"
            alt={`${publicFirestoreDataOfUser!.firstName}'s background`}
          ></img>
        </div>

        <div className="mx-4">
          <div className="flex items-start gap-2">
            <img
              className="max-w-16 rounded-full border-2 border-transparent transition-all duration-100 hover:border-thirdColor"
              src={publicFirestoreDataOfUser!.photoUrl!}
              alt={`${publicFirestoreDataOfUser!.firstName}'s Profile`}
            />

            <div>
              <p>{`${publicFirestoreDataOfUser!.firstName} ${publicFirestoreDataOfUser!.lastName}`}</p>
              <p>{publicFirestoreDataOfUser!.gender}</p>
              <p>
                {" "}
                Birth date: {publicFirestoreDataOfUser!.birthMonth},{" "}
                {publicFirestoreDataOfUser!.birthDay} of{" "}
                {publicFirestoreDataOfUser!.birthYear}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-secondColor font-robotoSlab text-xl text-firstColor">
      <div className="max-h-80 w-full overflow-hidden">
        <img
          src={publicFirestoreDataOfUser!.backgroundImageUrl!}
          className="w-full object-cover"
          alt={`${publicFirestoreDataOfUser!.firstName}'s background`}
        ></img>
      </div>

      <div className="mx-4">
        <div className="flex items-start gap-2">
          <img
            className="max-w-16 rounded-full border-2 border-transparent transition-all duration-100 hover:border-thirdColor"
            src={publicFirestoreDataOfUser!.photoUrl!}
            alt={`${publicFirestoreDataOfUser!.firstName}'s Profile`}
          />

          <div>
            <p>{`${publicFirestoreDataOfUser!.firstName} ${publicFirestoreDataOfUser!.lastName}`}</p>
            <p>{publicFirestoreDataOfUser!.gender}</p>
            <p>
              {" "}
              Birth date: {publicFirestoreDataOfUser!.birthMonth},{" "}
              {publicFirestoreDataOfUser!.birthDay} of{" "}
              {publicFirestoreDataOfUser!.birthYear}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileInfo;
