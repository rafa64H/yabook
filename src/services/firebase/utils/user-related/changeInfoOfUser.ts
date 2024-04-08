import { doc, updateDoc } from "firebase/firestore";
import { auth } from "../../firebaseInit";

async function changeInfoOfUser() {
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
    await updateDoc(privateInformationRef, {
      "privateInformation.password": newPassword,
    });
    return newPrivateInformation;
  } catch (err) {
    console.log(err);
  }
}
