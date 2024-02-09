import React from "react";

function FormInputPassword({
  textLabel,
  name,
  id,
}: {
  textLabel: string;
  name: string;
  id: string;
}) {
  return (
    <div className="my-3">
      <label className="font-robotoSlab text-2xl font-semibold" htmlFor={id}>
        {textLabel}
      </label>
      <input
        type="password"
        name={name}
        id={id}
        data-error-input="false"
        className="block w-[90%] max-w-[45rem] py-1 font-inter data-[error-input=true]:border-2 data-[error-input=true]:border-red-500"
        onFocus={(e) => {
          e.target.setAttribute("data-error-input", "false");
        }}
      />
    </div>
  );
}

export default FormInputPassword;
