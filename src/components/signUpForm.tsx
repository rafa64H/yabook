import React, { useRef, useState, useEffect } from "react";
import type { FormEvent } from "react";
import FormInputText from "./ui/formInputText";
import FormInputPassword from "./ui/formInputPassword";
import RedBtn from "./ui/redBtn";
import SelectInput from "./ui/selectInput";
import { monthsAndDays, years } from "../utils/monthsAndDaysOptions";
import {
  createUserDataFirestore,
  signUpWithEmailAndPassword,
} from "../services/firebase/utils/signUpWithEmailAndPassword";
import FormInputEmail from "./ui/formInputEmail";

function SignUpForm() {
  const [monthState, setMonthState] = useState("1");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const firstNameElement = firstNameRef.current;
    const lastNameElement = lastNameRef.current;
    const emailElement = emailRef.current;
    const passwordElement = passwordRef.current;
    const confirmPasswordElement = confirmPasswordRef.current;
    const genderElement = genderRef.current;
    const dayElement = dayRef.current;
    const monthElement = monthRef.current;
    const yearElement = yearRef.current;

    const allElements = [
      firstNameElement,
      lastNameElement,
      emailElement,
      passwordElement,
      confirmPasswordElement,
      genderElement,
      dayElement,
      monthElement,
      yearElement,
    ];

    if (allElements.some((element) => element === null)) {
      return null;
    }
    if (
      allElements.some(
        (element) => element!.value === "" || element!.value === null,
      )
    ) {
      allElements.map((element) => {
        if (element!.value === "" || element!.value === null) {
          element!.setAttribute("data-error-input", "true");
        }
      });
      return null;
    }

    if (passwordElement!.value !== confirmPasswordElement!.value) {
      passwordElement!.setAttribute("data-error-input", "true");
      confirmPasswordElement!.setAttribute("data-error-input", "true");
      return null;
    }

    console.log(
      emailElement!.value,
      passwordElement!.value,
      genderElement!.value,
      dayElement!.value,
      monthElement!.value,
      yearElement!.value,
    );

    const signUp = await signUpWithEmailAndPassword(
      firstNameElement!.value,
      lastNameElement!.value,
      emailElement!.value,
      passwordElement!.value,
      genderElement!.value,
      dayElement!.value,
      monthElement!.value,
      yearElement!.value,
    );

    if (signUp === "auth/email-already-in-use") {
      emailElement!.setAttribute("data-error-input", "true");
      return null;
    }
    if (signUp === "auth/weak-password") {
      passwordElement!.setAttribute("data-error-input", "true");
      confirmPasswordElement!.setAttribute("data-error-input", "true");
      return null;
    }
  }

  return (
    <>
      <h1 className="text-center font-robotoSlab text-5xl font-bold">
        Sign up
      </h1>

      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="mx-auto my-2 w-[70%] max-w-[45rem]"
      >
        <FormInputText
          textLabel="First name"
          name="firstName"
          id="first-name"
          refProp={firstNameRef}
        ></FormInputText>

        <FormInputText
          textLabel="Last name"
          name="lastName"
          id="first-name"
          refProp={lastNameRef}
        ></FormInputText>

        <FormInputEmail
          textLabel="Email"
          name="email"
          id="email"
          refProp={emailRef}
        ></FormInputEmail>

        <FormInputPassword
          textLabel="Password"
          name="password"
          id="password"
          refProp={passwordRef}
        ></FormInputPassword>
        <FormInputPassword
          textLabel="Confirm password"
          name="confirmPassword"
          id="confirm-password"
          refProp={confirmPasswordRef}
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

        <RedBtn typeButton="submit" textBtn="Sign up"></RedBtn>
      </form>
    </>
  );
}

export default SignUpForm;
