import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import type { FormEvent } from "react";
import FormInputPassword from "./ui/formInputPassword";
import TransparentBtn from "./ui/transparentBtn";
import RedBtn from "./ui/redBtn";

function SettingsAccount() {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();

  const passwordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordConfirmRef = useRef<HTMLInputElement>(null);

  const url = new URL(window.location.href);
  const uid = url.searchParams.get("uid");

  async function handleSubmitChangePassword(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <section>
      <h1 className="my-2 text-center text-3xl font-bold text-firstColor">
        Account settings
      </h1>
      <div className="m-4 flex flex-wrap justify-between text-firstColor">
        <ul className="text-xl">
          <li>
            <TransparentBtn
              textBtn="Change password"
              typeButton="button"
            ></TransparentBtn>
          </li>
          <li>
            <TransparentBtn
              textBtn="Account information"
              typeButton="button"
            ></TransparentBtn>
          </li>
          <li>
            <TransparentBtn
              textBtn="Privacy settings"
              typeButton="button"
            ></TransparentBtn>
          </li>
        </ul>

        <form
          onSubmit={(e) => {
            handleSubmitChangePassword(e);
          }}
          className="w-[90%] bg-secondColor px-2 sm:w-[70%]"
        >
          <FormInputPassword
            textLabel="Password"
            name="password"
            id="password"
            refProp={passwordRef}
          ></FormInputPassword>
          <FormInputPassword
            textLabel="New password"
            name="newPassword"
            id="newPassword"
            refProp={newPasswordRef}
          ></FormInputPassword>
          <FormInputPassword
            textLabel="Confirm new password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            refProp={newPasswordConfirmRef}
          ></FormInputPassword>
          <RedBtn textBtn="Change password" typeButton="submit"></RedBtn>
        </form>
      </div>
    </section>
  );
}

export default SettingsAccount;
