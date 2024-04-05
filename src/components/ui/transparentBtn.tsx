import React from "react";

type props = {
  textBtn: string;
  typeButton?: "submit" | "button" | "reset" | undefined;
  selected?: boolean;
};
function TransparentBtn({ textBtn, typeButton, selected }: props) {
  return (
    <button
      type={`${typeButton ? typeButton : "button"}`}
      className="data-[selected]: p-2 transition-all duration-100 hover:bg-thirdColor hover:text-white data-[selected='true']:bg-fourthColor data-[selected='true']:font-bold data-[selected='true']:text-white"
      data-selected={selected}
    >
      {textBtn}
    </button>
  );
}

export default TransparentBtn;
