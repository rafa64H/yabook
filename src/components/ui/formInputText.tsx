import React from "react";
import type { RefObject } from "react";

function FormInputText({
  textLabel,
  name,
  id,
  refProp,
}: {
  textLabel: string;
  name: string;
  id: string;
  refProp?: RefObject<HTMLInputElement>;
}) {
  return (
    <div className="my-3">
      <label className="font-robotoSlab text-2xl font-semibold" htmlFor={id}>
        {textLabel}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        data-error-input="false"
        ref={refProp}
        className="block w-[90%] max-w-[45rem] py-1 font-inter data-[error-input=true]:border-2 data-[error-input=true]:border-red-500"
        onFocus={(e) => {
          e.target.setAttribute("data-error-input", "false");
        }}
      />
    </div>
  );
}

export default FormInputText;
