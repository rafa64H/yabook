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
    <div>
      <label htmlFor={id}>{textLabel}</label>

      <select id={id} ref={refProp}>
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
