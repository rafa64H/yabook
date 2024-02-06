import React from "react";
import FormInputText from "./ui/formInputText";
import FormInputPassword from "./ui/formInputPassword";

function SignUpForm() {
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

      <button className="bg-thirdColor px-8 py-4 font-bold text-white transition-all duration-200 hover:bg-fourthColor hover:bg-secondColor">
        Sign up
      </button>
    </form>
  );
}

export default SignUpForm;
