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
import { signInWithEmailAndPasswordFunction } from "../services/firebase/utils/signInWithEmailAndPassword";

function SignInForm() {
  const [monthState, setMonthState] = useState("1");

  const emailRef = useRef<HTMLSelectElement>(null);
  const passwordRef = useRef<HTMLSelectElement>(null);
  const confirmPasswordRef = useRef<HTMLSelectElement>(null);

  const handleChange = (value: string) => {
    setMonthState(value);
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const emailElement = emailRef.current;
    const passwordElement = passwordRef.current;
    const confirmPasswordElement = confirmPasswordRef.current;
  }

  return (
    <>
      <h1 className="text-center font-robotoSlab text-5xl font-bold">Login</h1>

      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="mx-auto my-2 w-[70%] max-w-[45rem]"
      >
        <FormInputText
          textLabel="Email"
          name="email"
          id="email"
          refProp={emailRef}
        ></FormInputText>

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

        <RedBtn typeButton="submit" textBtn="Sign in"></RedBtn>
      </form>
    </>
  );
}

export default SignInForm;
