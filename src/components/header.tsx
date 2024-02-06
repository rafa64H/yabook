import React, { useRef } from "react";
import CompanyLogo from "./ui/companyLogo";
import NavBarItem from "./ui/navBarItem";

function Header() {
  return (
    <header className=" text-white ">
      <div className=" flex items-center justify-between bg-firstColor px-5 py-10">
        <CompanyLogo></CompanyLogo>
        <button className="cursor-pointer p-2" aria-expanded="false">
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>
      </div>

      <nav className="">
        <ul className="top-30 absolute z-10 flex w-full flex-col items-center justify-between bg-firstColor font-robotoSlab text-lg font-semibold">
          <NavBarItem text="Home" link="#home"></NavBarItem>
          <NavBarItem text="About" link="#about"></NavBarItem>
          <NavBarItem text="Services" link="#services"></NavBarItem>
          <NavBarItem text="Portfolio" link="#portfolio"></NavBarItem>
          <NavBarItem text="Contact" link="#contact"></NavBarItem>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
