import React from "react";

type props = {
  text: string;
  link: string;
  additionalFunction?: Function;
};

function NavBarItem({ text, link, additionalFunction }: props) {
  return (
    <li className="my-1">
      <a
        href={link}
        className=" relative inline-block py-2 after:absolute after:bottom-0 after:left-0 after:block after:w-full after:scale-x-0 after:bg-white after:py-[0.08em] after:transition-all  after:duration-200 after:content-[''] hover:after:scale-x-100"
        onClick={() => {
          if (typeof additionalFunction === "function") {
            additionalFunction();
          }
        }}
      >
        {text}
      </a>
    </li>
  );
}

export default NavBarItem;
