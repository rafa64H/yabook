import React from "react";
import { Link } from "react-router-dom";

function CompanyLogo() {
  return (
    <Link to={"/"} className="font-sixtyFour text-2xl">
      <strong>Yabook</strong>
    </Link>
  );
}

export default CompanyLogo;
