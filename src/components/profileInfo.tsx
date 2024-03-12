import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

function ProfileInfo() {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();

  const url = new URL(window.location.href);
  const uid = url.searchParams.get("uid");

  if (user.uid === uid) {
    return (
      <section className="bg-secondColor font-robotoSlab text-xl text-firstColor">
        <div className="max-h-80 w-full overflow-hidden">
          <img
            src={user.firestoreData.backgroundImageUrl}
            className="w-full object-cover"
            alt={`${user.displayName}'s background image`}
          ></img>
        </div>

        <div className="mx-4">
          <div className="flex items-start gap-2">
            <img
              className="max-w-16 rounded-full border-2 border-transparent transition-all duration-100 hover:border-thirdColor"
              src={user.photoURL}
              alt={`${user.displayName} background image`}
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
            <a href="./account-settings.html" className="ml-auto">
              <i className="fa-solid fa-cog"></i>
            </a>
          </div>
        </div>
      </section>
    );
  }

  return <h1>Some User</h1>;
}

export default ProfileInfo;
