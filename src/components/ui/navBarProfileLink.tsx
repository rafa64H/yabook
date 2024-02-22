import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

function NavBarProfileLink() {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();

  return (
    <a href="#" className="min- inline-block">
      <img
        className="max-w-16 rounded-full border-2 border-transparent transition-all duration-100 hover:border-thirdColor"
        src={user.photoURL}
        alt=""
      />
    </a>
  );
}

export default NavBarProfileLink;
