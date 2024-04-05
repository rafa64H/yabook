import React, { useEffect, useRef, useState } from "react";
import CompanyLogo from "./ui/companyLogo";
import NavBarItem from "./ui/navBarItem";
import SearchBar from "./ui/searchBar";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase/firebaseInit";
import { initialState, setUser } from "../services/redux/auth/authSlice";
import NavBarProfileLink from "./ui/navBarProfileLink";
import { getPublicInformationOfUser } from "../services/firebase/utils/getPublicInfoUser";
import { getPrivateInformationOfUser } from "../services/firebase/utils/getPrivateInfoUser";
import { getFriendsOnlyInformationOfUser } from "../services/firebase/utils/getFriendsOnlyInfoUser";

function Header() {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();
  const [navState, setNavState] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;

        const firestoreData = await getPublicInformationOfUser(user.uid);
        const firestorePrivateData = await getPrivateInformationOfUser(
          user.uid,
        );

        const firestoreFriendsOnlyData = await getFriendsOnlyInformationOfUser(
          user.uid,
        );

        if (!firestoreData) {
          return;
        }
        if (!firestorePrivateData) {
          return;
        }
        if (!firestoreFriendsOnlyData) {
          return;
        }
        const userObjRedux = {
          uid,
          displayName,
          email,
          photoURL,
          firestoreData: firestoreData,
          firestorePrivateData: firestorePrivateData,
          firestoreFriendsOnlyData: firestoreFriendsOnlyData,
        };

        dispatch(setUser(userObjRedux));
        const pathname = window.location.pathname;
        if (pathname === "/login.html" || pathname === "/sign-up.html") {
          window.location.href = "./index.html";
        }
      } else {
        const pathname = window.location.pathname;
        if (pathname !== "/sign-up.html" && pathname !== "/login.html") {
          window.location.href = "./sign-up.html";
        }
      }
    });
  }, []);

  return (
    <header className=" text-white ">
      <div className=" flex items-center justify-between bg-firstColor px-5 py-10">
        <CompanyLogo></CompanyLogo>

        {user !== initialState.user ? (
          <button
            onClick={() => {
              setNavState((navState) => !navState);
            }}
            className="cursor-pointer p-2"
            aria-expanded={navState}
          >
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        ) : (
          <></>
        )}
      </div>

      {user !== initialState.user ? (
        <nav
          className={`${navState ? "scale-y-100" : "scale-y-0"} transition-all duration-100`}
          aria-hidden={!navState}
        >
          <ul className="top-30 absolute z-10 flex w-full flex-col items-center justify-between bg-firstColor font-robotoSlab text-lg font-semibold">
            <NavBarItem text="Home" link="./login.html"></NavBarItem>
            <NavBarItem text="About" link="./sign-up.html"></NavBarItem>
            <NavBarItem text="Services" link="#services"></NavBarItem>
            <NavBarItem text="Portfolio" link="#portfolio"></NavBarItem>
            <NavBarItem text="Contact" link="#contact"></NavBarItem>
            <NavBarItem
              text="Sign out"
              link="#sign out"
              additionalFunction={async () => {
                try {
                  await signOut(auth);
                  dispatch(setUser(initialState.user));
                  window.location.href = "./login.html";
                } catch (err) {
                  console.log(err);
                }
              }}
            ></NavBarItem>
            <NavBarProfileLink></NavBarProfileLink>

            <li className="my-2">
              <SearchBar></SearchBar>
            </li>
          </ul>
        </nav>
      ) : (
        <></>
      )}
    </header>
  );
}

export default Header;
