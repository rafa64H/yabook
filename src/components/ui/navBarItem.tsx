import React from "react";

function NavBarItem({ text, link }: { text: string; link: string }) {
  return (
    <li className="my-1">
      <a
        href={link}
        className=" relative inline-block py-2 after:absolute after:bottom-0 after:left-0 after:block after:w-full after:scale-x-0 after:bg-white after:py-[0.08em] after:transition-all  after:duration-300 after:content-[''] hover:after:scale-x-100"
      >
        {text}
      </a>
    </li>
  );
}

export default NavBarItem;
