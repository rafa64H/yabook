import React, { useRef, useState, useEffect } from "react";
import type { FormEvent } from "react";
import FormInputText from "./ui/formInputText";
import FormInputPassword from "./ui/formInputPassword";
import RedBtn from "./ui/redBtn";
import { signInWithEmailAndPasswordFunction } from "../services/firebase/utils/user-related/signInWithEmailAndPassword";
import FormInputEmail from "./ui/formInputEmail";
import { Link, useNavigate } from "react-router-dom";

function SignInForm() {
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const emailElement = emailRef.current;
    const passwordElement = passwordRef.current;

    const allElements = [emailElement, passwordElement];

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
          setAlertMessage("Wrong email or password");
          element!.setAttribute("data-error-input", "true");
        }
      });
      return null;
    }

    const signIn = await signInWithEmailAndPasswordFunction(
      emailElement!.value,
      passwordElement!.value,
    );

    if (signIn === "auth/invalid-credential") {
      emailElement!.setAttribute("data-error-input", "true");
      passwordElement!.setAttribute("data-error-input", "true");
      setAlertMessage("Wrong email or password");
      return null;
    }

    navigate("/");
  }

  return (
    <>
      <h1 className="text-center font-robotoSlab text-5xl font-bold">Login</h1>

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

        <RedBtn typeButton="submit" textBtn="Sign in"></RedBtn>

        <p>
          <Link to="/sign-up" className="font-inter text-lg  hover:underline">
            Forgot password? Recover password
          </Link>
        </p>

        <p>
          <Link to="/sign-up" className="font-inter text-lg  hover:underline">
            Not having account? Register
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignInForm;
