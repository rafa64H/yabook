import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import type { FormEvent } from "react";
import FormInputPassword from "./ui/formInputPassword";
import TransparentBtn from "./ui/transparentBtn";
import RedBtn from "./ui/redBtn";
import InputRadioBtns from "./ui/inputRadioBtns";
import FormInputText from "./ui/formInputText";
import FormInputEmail from "./ui/formInputEmail";
import SelectInput from "./ui/selectInput";
import { monthsAndDays, years } from "../utils/monthsAndDaysOptions";

function SettingsAccount() {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");
  const [monthState, setMonthState] = useState("1");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const genderRef = useRef<HTMLSelectElement>(null);
  const dayRef = useRef<HTMLSelectElement>(null);
  const monthRef = useRef<HTMLSelectElement>(null);
  const yearRef = useRef<HTMLSelectElement>(null);

  const passwordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordConfirmRef = useRef<HTMLInputElement>(null);

  const url = new URL(window.location.href);
  const uid = url.searchParams.get("uid");

  async function handleSubmitChangePassword(e: FormEvent) {
    e.preventDefault();
  }

  const handleChange = (value: string) => {
    setMonthState(value);
  };

  return (
    <section>
      <h1 className="my-2 text-center text-3xl font-bold text-firstColor">
        Account settings
      </h1>
      <div className="m-4 flex flex-wrap justify-between text-firstColor">
        <ul className="text-xl">
          <li
            onClick={() => {
              setSelectedOption(1);
            }}
          >
            <TransparentBtn
              textBtn="Change password"
              typeButton="button"
              selected={selectedOption === 1 ? true : false}
            ></TransparentBtn>
          </li>
          <li
            onClick={() => {
              setSelectedOption(2);
            }}
          >
            <TransparentBtn
              textBtn="Account information"
              typeButton="button"
              selected={selectedOption === 2 ? true : false}
            ></TransparentBtn>
          </li>
          <li
            onClick={() => {
              setSelectedOption(3);
            }}
          >
            <TransparentBtn
              textBtn="Privacy settings"
              typeButton="button"
              selected={selectedOption === 3 ? true : false}
            ></TransparentBtn>
          </li>
        </ul>

        <section className={`w-[90%] bg-slate-300 px-2 sm:w-[70%] `}>
          <form
            onSubmit={(e) => {
              handleSubmitChangePassword(e);
            }}
            className={`${selectedOption === 1 ? "block" : "hidden"}`}
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

          <form
            onSubmit={(e) => {
              handleSubmitChangePassword(e);
            }}
            className={`${selectedOption === 2 ? "block" : "hidden"}`}
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
                optionsProp={monthsAndDays.map(
                  (monthAndDay) => monthAndDay.month,
                )}
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

            <RedBtn textBtn="Update information" typeButton="submit"></RedBtn>
          </form>

          <form
            onSubmit={(e) => {
              handleSubmitChangePassword(e);
            }}
            className={`${selectedOption === 3 ? "block" : "hidden"}`}
          >
            <section className=" w-full max-w-[40rem] text-lg">
              <InputRadioBtns
                title="Gender:"
                options={["Public", "Friends only", "Private"]}
                name="gender"
                values={["public", "friendsOnly", "private"]}
              ></InputRadioBtns>

              <InputRadioBtns
                title="Birth date:"
                options={["Public", "Friends only", "Private"]}
                name="Birth date"
                values={["public", "friendsOnly", "private"]}
              ></InputRadioBtns>
            </section>
          </form>
        </section>
      </div>
    </section>
  );
}

export default SettingsAccount;
