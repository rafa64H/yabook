import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import type { ChangeEvent, FormEvent } from "react";
import FormInputPassword from "./ui/formInputPassword";
import TransparentBtn from "./ui/transparentBtn";
import RedBtn from "./ui/redBtn";
import InputRadioBtns from "./ui/inputRadioBtns";
import FormInputText from "./ui/formInputText";
import FormInputEmail from "./ui/formInputEmail";
import SelectInput from "./ui/selectInput";
import { monthsAndDays, years } from "../utils/monthsAndDaysOptions";
import { updatePasswordOfUser } from "../services/firebase/utils/user-related/updatePasswordOfUser";
import { setFirestorePrivateData } from "../services/redux/auth/authSlice";
import { reauthenticateUser } from "../services/firebase/utils/user-related/reauthenticateUser";
import { checkGenderPrivacy } from "../utils/checkGenderPrivacy";
import { checkBirthDatePrivacy } from "../utils/checkBirthDatePrivacy";
import { changeInfoOfUser } from "../services/firebase/utils/user-related/changeInfoOfUser";

function SettingsAccount() {
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();

  const [editImage, setEditImage] = useState(user.photoURL);
  const [editBackgroundImage, setEditBackgroundImage] = useState(
    user.firestoreData.backgroundImageUrl,
  );
  const [profileImageToUpload, setProfileImageToUpload] = useState();
  const [backgroundImageToUpload, setBackgroundImageToUpload] = useState();

  const [selectedOptionSettings, setSelectedOptionSettings] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");
  const [monthState, setMonthState] = useState("1");

  const editImageRef = useRef<HTMLInputElement>(null);
  const editBackgroundImageRef = useRef<HTMLInputElement>(null);

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

  const genderPrivacyRef = useRef<HTMLInputElement>(null);
  const birthDatePrivacyRef = useRef<HTMLInputElement>(null);

  const url = new URL(window.location.href);
  const uid = url.searchParams.get("uid");

  useEffect(() => {
    console.log(
      genderPrivacyRef.current!.value,
      birthDatePrivacyRef.current!.value,
    );
  });

  useEffect(() => {
    firstNameRef.current!.value = `${user.firestoreData.firstName}`;
    lastNameRef.current!.value = `${user.firestoreData.lastName}`;
    emailRef.current!.value = `${user.email}`;

    genderPrivacyRef.current!.value = checkGenderPrivacy(user);
    birthDatePrivacyRef.current!.value = checkBirthDatePrivacy(user);
  }, []);

  async function handleSubmitChangePassword(e: FormEvent) {
    e.preventDefault();

    if (passwordRef.current!.value !== user.firestorePrivateData.password) {
      setAlertMessage("Wrong curent password");
      passwordRef.current!.setAttribute("data-error-input", "true");
      return;
    }
    if (
      newPasswordRef.current!.value !== newPasswordConfirmRef.current!.value
    ) {
      setAlertMessage("New passwords do not match");
      newPasswordRef.current!.setAttribute("data-error-input", "true");
      newPasswordConfirmRef.current!.setAttribute("data-error-input", "true");
      return;
    }
    if (newPasswordRef.current!.value.length < 6) {
      setAlertMessage(
        "New password must have a length of at least 6 characters",
      );
      newPasswordRef.current!.setAttribute("data-error-input", "true");
      newPasswordConfirmRef.current!.setAttribute("data-error-input", "true");
      return;
    }

    try {
      await reauthenticateUser(user.firestorePrivateData.password);

      const newFirestoreDataAfterChange = await updatePasswordOfUser(
        newPasswordRef.current!.value,
        user.uid!,
        user.firestorePrivateData,
      );

      if (!newFirestoreDataAfterChange) {
        throw new Error("Could not update password of user");
      }

      dispatch(setFirestorePrivateData(newFirestoreDataAfterChange));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmitChangeInformation(e: FormEvent) {
    e.preventDefault();

    const allInputsText = [
      firstNameRef.current!,
      lastNameRef.current!,
      emailRef.current!,
    ];

    allInputsText.map((inputElement) => {
      const isOnlySpaces = /^ *$/.test(inputElement.value);

      const genderPrivacy = checkGenderPrivacy(user);
      const birthDatePrivacy = checkBirthDatePrivacy(user);

      console.log(genderPrivacy, birthDatePrivacy);

      if (inputElement.value === "" || isOnlySpaces) {
        setAlertMessage("Please don't let an empty space");
        inputElement.setAttribute("data-error-input", "true");
        return;
      }
    });

    try {
      await reauthenticateUser(user.firestorePrivateData.password!);
      const currentGenderPrivacy = checkGenderPrivacy(user);
      const currentBirthDatePrivacy = checkBirthDatePrivacy(user);
      const newInformationUser = await changeInfoOfUser(
        user,
        currentGenderPrivacy,
        currentBirthDatePrivacy,
        editImage!,
        editBackgroundImage!,
        firstNameRef.current!.value,
        lastNameRef.current!.value,
        emailRef.current!.value,
        genderRef.current!.value,
        dayRef.current!.value,
        monthRef.current!.value,
        yearRef.current!.value,
      );
      console.log(newInformationUser);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmitChangePrivacy(e: FormEvent) {
    e.preventDefault();
  }

  const handleChange = (value: string) => {
    setMonthState(value);
  };

  const handleChangeEditImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setEditImage(url);
    }
  };

  const handleChangeEditBackgroundImage = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setEditBackgroundImage(url);
    }
  };

  const changePrivacyGender = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    genderPrivacyRef.current!.value = target.value;
  };

  const changePrivacyBirthDate = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    birthDatePrivacyRef.current!.value = target.value;
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
              setSelectedOptionSettings(1);
            }}
          >
            <TransparentBtn
              textBtn="Change password"
              typeButton="button"
              selected={selectedOptionSettings === 1 ? true : false}
            ></TransparentBtn>
          </li>
          <li
            onClick={() => {
              setSelectedOptionSettings(2);
            }}
          >
            <TransparentBtn
              textBtn="Account information"
              typeButton="button"
              selected={selectedOptionSettings === 2 ? true : false}
            ></TransparentBtn>
          </li>
          <li
            onClick={() => {
              setSelectedOptionSettings(3);
            }}
          >
            <TransparentBtn
              textBtn="Privacy settings"
              typeButton="button"
              selected={selectedOptionSettings === 3 ? true : false}
            ></TransparentBtn>
          </li>
          <li
            onClick={() => {
              setSelectedOptionSettings(4);
            }}
          >
            <TransparentBtn
              textBtn="Friends"
              typeButton="button"
              selected={selectedOptionSettings === 4 ? true : false}
            ></TransparentBtn>
          </li>
        </ul>

        <section className={`w-[90%] bg-slate-300 px-2 sm:w-[70%] `}>
          <form
            onSubmit={(e) => {
              handleSubmitChangePassword(e);
            }}
            className={`${selectedOptionSettings === 1 ? "block" : "hidden"}`}
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
              handleSubmitChangeInformation(e);
            }}
            className={`${selectedOptionSettings === 2 ? "block" : "hidden"}`}
          >
            <h3 className="my-2  text-xl font-bold text-firstColor">
              Profile picture:
            </h3>

            <button
              type="button"
              aria-label="Edit profile picture"
              className="relative block min-w-[15%] max-w-24"
              onClick={() => editImageRef.current!.click()}
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={editImageRef}
                onChange={(e) => handleChangeEditImage(e)}
              />
              <div className="absolute h-full w-full bg-black opacity-0 transition-all duration-200 hover:opacity-40">
                <i className="fa-solid fa-pencil absolute text-center text-xl text-white"></i>
              </div>

              <img className="object-cover" src={`${editImage}`} alt="" />
            </button>

            <h3 className="my-2  text-xl font-bold text-firstColor">
              Background image:
            </h3>

            <button
              type="button"
              aria-label="Edit background image"
              className="relative block max-h-80 min-w-[25%] max-w-[30rem] overflow-hidden"
              onClick={() => editBackgroundImageRef.current!.click()}
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={editBackgroundImageRef}
                onChange={(e) => handleChangeEditBackgroundImage(e)}
              />
              <div className="absolute h-full w-full bg-black opacity-0 transition-all duration-200 hover:opacity-40">
                <i className="fa-solid fa-pencil absolute text-center text-xl text-white"></i>
              </div>

              <img
                className="w-full object-cover"
                src={`${editBackgroundImage}`}
                alt=""
              />
            </button>

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

            <h2 className="my-2 text-xl font-semibold">
              Current set gender is "{user.firestoreData.gender}"
            </h2>
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
            <h2 className="my-2 text-xl font-semibold">
              Current set birth date is "{user.firestoreData.birthMonth}/
              {user.firestoreData.birthDay}/{user.firestoreData.birthYear}"
            </h2>

            <div className="mb-7 flex items-center">
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
              handleSubmitChangePrivacy(e);
            }}
            className={`${selectedOptionSettings === 3 ? "block" : "hidden"}`}
          >
            <section className=" w-full max-w-[40rem] text-lg">
              <InputRadioBtns
                title="Gender:"
                options={["Public", "Friends only", "Private"]}
                name="gender"
                values={["publicGender", "friendsOnlyGender", "privateGender"]}
                onClickFunction={changePrivacyGender}
                valueForChecked={genderPrivacyRef.current?.value}
              ></InputRadioBtns>

              <InputRadioBtns
                title="Birth date:"
                options={["Public", "Friends only", "Private"]}
                name="birthDate"
                values={[
                  "publicBirthDate",
                  "friendsOnlyBirthDate",
                  "privateBirthDate",
                ]}
                onClickFunction={changePrivacyBirthDate}
                valueForChecked={birthDatePrivacyRef.current?.value}
              ></InputRadioBtns>

              <div className="hidden">
                <input type="text" ref={genderPrivacyRef}></input>
                <input type="text" ref={birthDatePrivacyRef}></input>
              </div>

              <RedBtn textBtn="Change privacy" typeButton="submit"></RedBtn>
            </section>
          </form>

          <ul
            className={`w-full flex-col p-2 text-lg lg:flex-row lg:flex-wrap lg:justify-between lg:p-10 ${selectedOptionSettings === 4 ? "flex" : "hidden"}`}
          >
            <li className="relative w-[min(20rem,90%)]">
              <button className="absolute h-full w-full cursor-pointer opacity-0 transition-all duration-200 hover:bg-black hover:opacity-70">
                <span className="text-white opacity-100">View profile</span>
              </button>
              <img
                className="max-w-[7rem]"
                src="https://us-tuna-sounds-images.voicemod.net/e25e688c-c13b-4dc1-95ce-4f4a80a836cc-1706430301510.jpg"
              ></img>
              <h3 className="font-bold ">Pablo</h3>
              <p>
                Hello! I'm pablo and I usually code with my 1gb ram computer and
                intel atom processor...
              </p>
              <p>Male</p>
              <p>20-02-2003</p>
            </li>

            <li className="relative w-[min(20rem,90%)]">
              <button className="absolute h-full w-full cursor-pointer opacity-0 transition-all duration-200 hover:bg-black hover:opacity-70">
                <span className="text-white opacity-100">View profile</span>
              </button>
              <img
                className="max-w-[7rem]"
                src="https://us-tuna-sounds-images.voicemod.net/e25e688c-c13b-4dc1-95ce-4f4a80a836cc-1706430301510.jpg"
              ></img>
              <h3 className="font-bold ">Pablo</h3>
              <p>
                Hello! I'm pablo and I usually code with my 1gb ram computer and
                intel atom processor...
              </p>
              <p>Male</p>
              <p>20-02-2003</p>
            </li>

            <li className="relative w-[min(20rem,90%)]">
              <button className="absolute h-full w-full cursor-pointer opacity-0 transition-all duration-200 hover:bg-black hover:opacity-70">
                <span className="text-white opacity-100">View profile</span>
              </button>
              <img
                className="max-w-[7rem]"
                src="https://us-tuna-sounds-images.voicemod.net/e25e688c-c13b-4dc1-95ce-4f4a80a836cc-1706430301510.jpg"
              ></img>
              <h3 className="font-bold ">Pablo</h3>
              <p>
                Hello! I'm pablo and I usually code with my 1gb ram computer and
                intel atom processor...
              </p>
              <p>Male</p>
              <p>20-02-2003</p>
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}

export default SettingsAccount;
