import React from "react";

function SearchBar() {
  return (
    <div className=" bg-white font-inter text-xl text-black">
      <input type="text" className="py-2" />
      <a
        href=""
        alt="search"
        className="inline-block px-1 py-2 text-2xl text-firstColor transition-all duration-200 hover:bg-thirdColor"
      >
        <i className="fa-solid fa-magnifying-glass "></i>
      </a>
    </div>
  );
}

export default SearchBar;
