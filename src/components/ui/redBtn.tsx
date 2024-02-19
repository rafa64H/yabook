import React from "react";

type props = {
  textBtn: string;
  typeButton?: "submit" | "button" | "reset" | undefined;
};

function RedBtn({ textBtn, typeButton }: props) {
  return (
    <button
      type={`${typeButton ? typeButton : "button"}`}
      className="rounded-md bg-thirdColor px-8 py-4 font-bold text-white transition-all duration-200 hover:bg-fourthColor hover:text-secondColor"
    >
      {textBtn}
    </button>
  );
}

export default RedBtn;
