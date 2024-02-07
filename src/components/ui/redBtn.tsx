import React from "react";

function RedBtn({ textBtn }: { textBtn: string }) {
  return (
    <button className="bg-thirdColor px-8 py-4 font-bold text-white transition-all duration-200 hover:bg-fourthColor hover:text-secondColor">
      {textBtn}
    </button>
  );
}

export default RedBtn;
