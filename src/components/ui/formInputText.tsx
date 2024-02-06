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
    <div>
      <label htmlFor={id}>{textLabel}</label>
      <input type="text" name={name} id={id} className="block" />
    </div>
  );
}

export default FormInputText;
