import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseInit";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function signUpWithEmailAndPassword(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  gender: string,
  birthDay: string,
  birthMonth: string,
  birthYear: string,
) {
  try {
    let uid = "";

    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        uid = userCredential.user.uid;
      },
    );

    await createUserDataFirestore(
      uid,
      firstName,
      lastName,
      email,
      password,
      gender,
      birthDay,
      birthMonth,
      birthYear,
    );
  } catch (err) {
    console.log(err);
  }
}

export async function createUserDataFirestore(
  uid: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  gender: string,
  birthDay: string,
  birthMonth: string,
  birthYear: string,
) {
  try {
    const newDocumentRef = doc(db, "users", uid);

    const newDocumentData = {
      privateInformation: {
        uid: uid,
        password: password,
      },
      publicInformation: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        birthDay: birthDay,
        birthMonth: birthMonth,
        birthYear: birthYear,
      },
    };

    await setDoc(newDocumentRef, newDocumentData);

    console.log("updated");
  } catch (err) {
    console.log(err);
  }
}
