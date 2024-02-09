import React, { useRef, useState, useEffect } from "react";
import FormInputText from "./ui/formInputText";
import FormInputPassword from "./ui/formInputPassword";
import RedBtn from "./ui/redBtn";
import SelectInput from "./ui/selectInput";
import { monthsAndDays, years } from "../utils/monthsAndDaysOptions";

function SignUpForm() {
  const [monthState, setMonthState] = useState("1");

  const genderRef = useRef<HTMLSelectElement>(null);
  const dayRef = useRef<HTMLSelectElement>(null);
  const monthRef = useRef<HTMLSelectElement>(null);
  const yearRef = useRef<HTMLSelectElement>(null);

  const handleChange = (value: string) => {
    setMonthState(value);
  };

  // useEffect(() => {
  //   handleChange(1);
  // }, []);

  return (
    <>
      <h1 className="text-center font-robotoSlab text-5xl font-bold">
        Sign up
      </h1>

      <form action="" className="mx-auto my-2 w-[70%] max-w-[45rem]">
        <FormInputText
          textLabel="First name"
          name="firstName"
          id="first-name"
        ></FormInputText>

        <FormInputText
          textLabel="Last name"
          name="firstName"
          id="first-name"
        ></FormInputText>
        <FormInputPassword
          textLabel="Password"
          name="password"
          id="password"
        ></FormInputPassword>
        <FormInputPassword
          textLabel="Confirm password"
          name="confirmPassword"
          id="confirm-password"
        ></FormInputPassword>

        <h2 className="my-2 text-2xl font-semibold">Gender:</h2>

        <SelectInput
          id="gender"
          textLabel=""
          optionsProp={["Male", "Female"]}
          refProp={genderRef}
        ></SelectInput>

        <h2 className="my-2 text-2xl font-semibold">Birth date:</h2>

        <div className="mb-7 flex items-center">
          <SelectInput
            id="day"
            textLabel="Day: "
            optionsProp={
              monthsAndDays[monthState ? Number(monthState) - 1 : 0].days
            }
            refProp={dayRef}
          ></SelectInput>
          <SelectInput
            id="month"
            textLabel="Month: "
            optionsProp={monthsAndDays.map((monthAndDay) => monthAndDay.month)}
            refProp={monthRef}
            functionProp={handleChange}
            stateProp={monthState}
          ></SelectInput>
          <SelectInput
            id="year"
            textLabel="Year: "
            optionsProp={years}
            refProp={yearRef}
          ></SelectInput>
        </div>

        <RedBtn textBtn="Sign up"></RedBtn>
      </form>
    </>
  );
}

export default SignUpForm;
