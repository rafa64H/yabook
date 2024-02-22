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
  const [alertMessage, setAlertMessage] = useState("");

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
      const allEmptyInputsString = allElements.reduce(
        (accString, element, index) => {
          if (element!.value === "" || element!.value === null) {
            element!.setAttribute("data-error-input", "true");
            accString =
              index === 0
                ? accString + ` ${element!.getAttribute("data-text-label")}`
                : accString + `, ${element!.getAttribute("data-text-label")}`;
          }
          return accString;
        },
        `The following inputs are empty: `,
      );

      setAlertMessage(allEmptyInputsString);

      return null;
    }

    if (passwordElement!.value !== confirmPasswordElement!.value) {
      passwordElement!.setAttribute("data-error-input", "true");
      confirmPasswordElement!.setAttribute("data-error-input", "true");
      setAlertMessage("Passwords do not match");
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
      setAlertMessage("Email already in use");
      return null;
    }
    if (signUp === "auth/weak-password") {
      passwordElement!.setAttribute("data-error-input", "true");
      confirmPasswordElement!.setAttribute("data-error-input", "true");
      setAlertMessage("Password too weak, must have a length of 6 characters");
      return null;
    }
  }

  return (
    <>
      <h1 className="text-center font-robotoSlab text-5xl font-bold">
        Sign up
      </h1>

      <aside className="mt-5 text-center font-inter text-red-500">
        {alertMessage}
      </aside>

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
          onFocusAdditionalFunction={() => {
            setAlertMessage("");
          }}
        ></FormInputText>

        <FormInputText
          textLabel="Last name"
          name="lastName"
          id="first-name"
          refProp={lastNameRef}
          onFocusAdditionalFunction={() => {
            setAlertMessage("");
          }}
        ></FormInputText>

        <FormInputEmail
          textLabel="Email"
          name="email"
          id="email"
          refProp={emailRef}
          onFocusAdditionalFunction={() => {
            setAlertMessage("");
          }}
        ></FormInputEmail>

        <FormInputPassword
          textLabel="Password"
          name="password"
          id="password"
          refProp={passwordRef}
          onFocusAdditionalFunction={() => {
            setAlertMessage("");
          }}
        ></FormInputPassword>
        <FormInputPassword
          textLabel="Confirm password"
          name="confirmPassword"
          id="confirm-password"
          refProp={confirmPasswordRef}
          onFocusAdditionalFunction={() => {
            setAlertMessage("");
          }}
        ></FormInputPassword>

        <h2 className="my-2 text-2xl font-semibold">Gender:</h2>

        <SelectInput
          id="gender"
          textLabel=""
          optionsProp={["Male", "Female"]}
          onFocusAdditionalFunction={() => {
            setAlertMessage("");
          }}
          refProp={genderRef}
        ></SelectInput>

        <h2 className="my-2 text-2xl font-semibold">Birth date:</h2>

        <div className="mb-7 flex items-center">
          <SelectInput
            id="day"
            textLabel="Day: "
            onFocusAdditionalFunction={() => {
              setAlertMessage("");
            }}
            optionsProp={
              monthsAndDays[monthState ? Number(monthState) - 1 : 0].days
            }
            refProp={dayRef}
          ></SelectInput>
          <SelectInput
            id="month"
            textLabel="Month: "
            optionsProp={monthsAndDays.map((monthAndDay) => monthAndDay.month)}
            onFocusAdditionalFunction={() => {
              setAlertMessage("");
            }}
            refProp={monthRef}
            functionProp={handleChange}
            stateProp={monthState}
          ></SelectInput>
          <SelectInput
            id="year"
            textLabel="Year: "
            onFocusAdditionalFunction={() => {
              setAlertMessage("");
            }}
            optionsProp={years}
            refProp={yearRef}
          ></SelectInput>
        </div>

        <RedBtn typeButton="submit" textBtn="Sign up"></RedBtn>

        <p>
          <a
            href="./login.html"
            className="font-inter text-lg  hover:underline"
          >
            Already have an account? Sign in
          </a>
        </p>
      </form>
    </>
  );
}

export default SignUpForm;
