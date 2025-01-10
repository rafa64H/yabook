import React, { useEffect, useRef, useState } from "react";
import CompanyLogo from "./ui/companyLogo";
import NavBarItem from "./ui/navBarItem";
import SearchBar from "./ui/searchBar";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase/firebaseInit";
import { initialState, setUser } from "../services/redux/auth/authSlice";
import NavBarProfileLink from "./ui/navBarProfileLink";
import { getPublicInformationOfUser } from "../services/firebase/utils/user-related/getPublicInfoUser";
import { getPrivateInformationOfUser } from "../services/firebase/utils/user-related/getPrivateInfoUser";
import { getFriendsOnlyInformationOfUser } from "../services/firebase/utils/user-related/getFriendsOnlyInfoUser";
import { reauthenticateUser } from "../services/firebase/utils/user-related/reauthenticateUser";
import type {
  UserRedux,
  FirestoreData,
  FirestoreFriendsOnlyData,
  FirestorePrivateData,
} from "../types/user-types";
import type { RootState } from "../services/redux/store";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = useAppSelector((store: RootState) => store.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [navState, setNavState] = useState(false);

  return (
    <header className="relative z-20 text-white ">
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
            <NavBarItem text="Home" link="/login"></NavBarItem>
            <NavBarItem text="About" link="/sign-up"></NavBarItem>
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
                  navigate("/login");
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
