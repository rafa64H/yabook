import React from "react";
import { v4 as uuidv4 } from "uuid";

type props = {
  options: string[];
  values: string[]; //for the "value" attribute on an element with Option
  name: string;
  title: string;
  onClickFunction?: Function;
  valueForChecked?: string;
};
function InputRadioBtns({
  options,
  name,
  values,
  title,
  onClickFunction,
  valueForChecked,
}: props) {
  return (
    <section className="flex flex-wrap justify-between">
      <h3 className="font-medium">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option, i) => {
          return (
            <div key={uuidv4()} className="mx-2 font-inter">
              <input
                type="radio"
                name={name}
                id={values[i]}
                value={values[i]}
                onClick={(e) => {
                  if (onClickFunction) onClickFunction(e);
                }}
                defaultChecked={valueForChecked === values[i]}
              />
              <label className="ml-2" htmlFor={values[i]}>
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default InputRadioBtns;
