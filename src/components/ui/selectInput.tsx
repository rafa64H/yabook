import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import type { RefObject } from "react";

function SelectInput({
  optionsProp,
  id,
  textLabel,
  refProp,
}: {
  optionsProp: string[] | number[];
  id: string;
  textLabel: string;
  refProp: RefObject<HTMLSelectElement>;
}) {
  return (
    <div className="mx-2">
      <label className=" font-robotoSlab text-xl font-semibold" htmlFor={id}>
        {textLabel}
      </label>

      <select
        id={id}
        ref={refProp}
        className="bg-white p-1 font-inter font-medium"
      >
        {optionsProp.map((option) => {
          return (
            <option key={uuidv4()} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectInput;
