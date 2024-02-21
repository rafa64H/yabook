import React from "react";
import type { RefObject } from "react";

type props = {
  textLabel: string;
  name: string;
  id: string;
  onFocusAdditionalFunction?: Function;
  refProp?: RefObject<HTMLInputElement>;
};

function FormInputPassword({
  textLabel,
  name,
  id,
  onFocusAdditionalFunction,
  refProp,
}: props) {
  return (
    <div className="my-3">
      <label className="font-robotoSlab text-2xl font-semibold" htmlFor={id}>
        {textLabel}
      </label>
      <input
        type="password"
        name={name}
        id={id}
        ref={refProp}
        data-text-label={textLabel}
        data-error-input="false"
        className="block w-[90%] max-w-[45rem] rounded-md border-2 border-black font-inter shadow-lg data-[error-input=true]:border-2 data-[error-input=true]:border-red-500"
        onFocus={(e) => {
          e.target.setAttribute("data-error-input", "false");
          if (typeof onFocusAdditionalFunction === "function")
            onFocusAdditionalFunction();
        }}
      />
    </div>
  );
}

export default FormInputPassword;
