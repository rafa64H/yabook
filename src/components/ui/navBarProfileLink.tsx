import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Link } from "react-router-dom";

function NavBarProfileLink() {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();

  return (
    <Link to={`./profile/${user.uid}`} className="min- inline-block">
      <img
        className="max-w-16 rounded-full border-2 border-transparent transition-all duration-100 hover:border-thirdColor"
        src={user.photoURL}
        alt=""
      />
    </Link>
  );
}

export default NavBarProfileLink;
