import React, { useRef, useState } from "react";
import FormInputText from "./ui/formInputText";
import FormInputPassword from "./ui/formInputPassword";
import RedBtn from "./ui/redBtn";
import SelectInput from "./ui/selectInput";
import monthsAndDays from "../utils/monthsAndDaysOptions";

function SignUpForm() {
  const [monthState, setMonthState] = useState(0);

  const monthRef = useRef<HTMLSelectElement>(null);
  const dayRef = useRef<HTMLSelectElement>(null);

  return (
    <form action="">
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

      <SelectInput
        id="day"
        textLabel="Day"
        optionsProp={monthsAndDays[0].days}
        refProp={dayRef}
      ></SelectInput>
      <SelectInput
        id="month"
        textLabel="Month"
        optionsProp={monthsAndDays.map((monthAndDay) => monthAndDay.month)}
        refProp={monthRef}
      ></SelectInput>
      <RedBtn textBtn="Sign up"></RedBtn>
    </form>
  );
}

export default SignUpForm;
