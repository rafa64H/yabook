import React from "react";

type props = {
  textBtn: string;
  typeButton?: "submit" | "button" | "reset" | undefined;
};
function TransparentBtn({ textBtn, typeButton }: props) {
  return (
    <button
      type={`${typeButton ? typeButton : "button"}`}
      className="p-2 transition-all duration-100 hover:bg-thirdColor hover:text-white"
    >
      {textBtn}
    </button>
  );
}

export default TransparentBtn;
