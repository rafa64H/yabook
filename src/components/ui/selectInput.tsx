import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import type { RefObject } from "react";

type props = {
  optionsProp: string[] | number[];
  id: string;
  textLabel: string;
  onFocusAdditionalFunction?: Function;
  refProp: RefObject<HTMLSelectElement>;
  stateProp?: string;
  functionProp?: Function;
};

function SelectInput({
  optionsProp,
  id,
  textLabel,
  onFocusAdditionalFunction,
  refProp,
  stateProp,
  functionProp,
}: props) {
  return (
    <div className="mx-2">
      <label className=" font-robotoSlab text-xl font-semibold" htmlFor={id}>
        {textLabel}
      </label>

      <select
        id={id}
        className="rounded-md border-2 border-black p-1 font-inter font-medium shadow-xl"
        onChange={(e) => {
          if (functionProp) {
            functionProp(e.target.value);
          }
        }}
        onFocus={() => {
          if (typeof onFocusAdditionalFunction === "function")
            onFocusAdditionalFunction();
        }}
        ref={refProp}
        value={stateProp}
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
