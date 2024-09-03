import React, { useRef, useState } from "react";
import RedBtn from "./redBtn";
//For it to work you need to put it inside a div (or any container with position:relative;)

type Props = {
  name: string;
  imageUrl: string;
  maxImageWidth?: string;
  gender: "Male" | "Female";
  text: string;
  birthDate: string;
  showName: boolean;
  showText: boolean;
  showGender: boolean;
  showBirthDate: boolean;
};

function ProfileCard({
  name,
  imageUrl,
  maxImageWidth,
  gender,
  text,
  birthDate,
  showName,
  showText,
  showGender,
  showBirthDate,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="relative w-fit">
        <button
          className="absolute h-full w-full cursor-pointer opacity-0 transition-all duration-200 hover:bg-black hover:opacity-70"
          onClick={() => {
            dialogRef.current?.showModal();
            document.body.style.overflow = "hidden";
          }}
        >
          <span className="text-white opacity-100">View profile</span>
        </button>
        <img
          className={`${maxImageWidth ? `max-w[${maxImageWidth}]` : "max-w-[7rem]"}`}
          src="https://us-tuna-sounds-images.voicemod.net/e25e688c-c13b-4dc1-95ce-4f4a80a836cc-1706430301510.jpg"
          alt={`${name}`}
        ></img>

        {showName ? <h3 className="font-bold">{name}</h3> : <></>}
        {showText ? (
          <p className="max-w-[20rem] overflow-hidden text-ellipsis whitespace-nowrap">
            {text}
          </p>
        ) : (
          <></>
        )}
        {showGender ? <p>{gender}</p> : <></>}
        {showBirthDate ? <p>{birthDate}</p> : <></>}
      </div>

      <dialog className="w-[min(15rem, 70%)] relative z-20" ref={dialogRef}>
        <div className="flex justify-end">
          <RedBtn
            textBtn="Close"
            typeButton="button"
            onClickFunction={() => {
              dialogRef.current?.close();
              document.body.style.overflow = "auto";
            }}
          ></RedBtn>
        </div>

        <div className="p-4 text-firstColor">
          <img
            className={`${maxImageWidth ? `max-w[${maxImageWidth}]` : "max-w-[7rem]"}`}
            src="https://us-tuna-sounds-images.voicemod.net/e25e688c-c13b-4dc1-95ce-4f4a80a836cc-1706430301510.jpg"
            alt={`${name}`}
          ></img>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-xl">{text}</p>
          <p className="text-xl">{gender}</p>
          <p className="text-xl">{birthDate}</p>
          <a href="./profile.html?uid=s">Go to profile page</a>
        </div>
      </dialog>
    </>
  );
}

export default ProfileCard;
