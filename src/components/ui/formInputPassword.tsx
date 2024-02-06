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
    <div>
      <label htmlFor={id}>{textLabel}</label>
      <input type="password" name={name} id={id} className="block" />
    </div>
  );
}

export default FormInputPassword;
