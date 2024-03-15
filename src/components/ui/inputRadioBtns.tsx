import React from "react";

type props = {
  options: string[];
  values: string[]; //for the "value" attribute on an element with Option
  name: string;
};
function InputRadioBtns({ options, name, values }: props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option, i) => {
        return (
          <div className="mx-2 font-inter">
            <input type="radio" name={name} id={values[i]} value={values[i]} />
            <label className="ml-2" htmlFor={values[i]}>
              {option}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default InputRadioBtns;
