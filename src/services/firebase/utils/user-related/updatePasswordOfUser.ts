import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseInit";
import { updatePassword } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import type { FirestorePrivateData } from "../../../../types/user-types";

export async function updatePasswordOfUser(
  newPassword: string,
  uid: string,
  firestorePrivateData: FirestorePrivateData,
) {
  const user = auth.currentUser;
  const privateInformationRef = doc(
    db,
    "users",
    uid,
    "information",
    "privateInformation",
  );

  const newPrivateInformation = {
    uid: firestorePrivateData.uid,
    birthDay: firestorePrivateData.birthDay,
    birthMonth: firestorePrivateData.birthMonth,
    birthYear: firestorePrivateData.birthYear,
    password: firestorePrivateData.password,
    gender: firestorePrivateData.gender,
  };
  newPrivateInformation.password = newPassword;

  try {
    await updatePassword(user!, newPassword);

    await updateDoc(privateInformationRef, {
      "privateInformation.password": newPassword,
    });
    return newPrivateInformation;
  } catch (err) {
    console.log(err);
  }
}
