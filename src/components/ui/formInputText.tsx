import React from "react";

function FormInputText({
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
        type="text"
        name={name}
        id={id}
        className="block w-[90%] max-w-[45rem] py-1 font-inter"
      />
    </div>
  );
}

export default FormInputText;
