import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebaseInit";
import type { User } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";

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
    let userObject: User | null = null;

    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        uid = userCredential.user.uid;
        userObject = userCredential.user;
      },
    );

    await createUserDataFirestore(
      userObject!,
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
    return userObject;
  } catch (err) {
    console.log(err);
    return err.code;
  }
}

export async function createUserDataFirestore(
  user: User,
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
    const newDocumentPrivateInformationRef = doc(
      db,
      "users",
      uid,
      "information",
      "privateInformation",
    );

    const newDocumentFriendsOnlyInformationRef = doc(
      db,
      "users",
      uid,
      "information",
      "friendsOnlyInformation",
    );

    const newDocumentPublicInformationRef = doc(
      db,
      "users",
      uid,
      "information",
      "publicInformation",
    );

    const newDocumentPostsRef = doc(
      db,
      "users",
      uid,
      "posts",
      "createdPostsCollection",
    );

    const newDocumentCommentsRef = doc(
      db,
      "users",
      uid,
      "comments",
      "createdPostsCollection",
    );

    const anonymousProfilePictureRef = ref(
      storage,
      "profilePictures/withoutProfilePicture/no-image.webp",
    );

    let profilePictureUrl = "";

    await getDownloadURL(anonymousProfilePictureRef).then((url) => {
      profilePictureUrl = url;
    });

    const withoutBackgroundImageRef = ref(
      storage,
      "backgroundImages/withoutBackgroundImage/no-background-image.jpg",
    );

    let backgroundImageUrl = "";

    await getDownloadURL(withoutBackgroundImageRef).then((url) => {
      backgroundImageUrl = url;
    });

    const newDocumentPrivateData = {
      privateInformation: {
        uid: uid,
        password: password,
        gender: null,
        birthDay: null,
        birthMonth: null,
        birthYear: null,
      },
    };

    const newDocumentFriendsOnlyData = {
      friendsOnlyInformation: {
        uid: uid,
        password: password,
        gender: null,
        birthDay: null,
        birthMonth: null,
        birthYear: null,
      },
    };

    const newDocumentPublicData = {
      publicInformation: {
        uid: uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        photoUrl: profilePictureUrl,
        backgroundImageUrl: backgroundImageUrl,
        gender: gender,
        birthDay: birthDay,
        birthMonth: birthMonth,
        birthYear: birthYear,
      },
    };

    await updateProfile(user, {
      photoURL: profilePictureUrl,
      displayName: `${firstName} ${lastName}`,
    });

    await setDoc(newDocumentPrivateInformationRef, newDocumentPrivateData);
    await setDoc(
      newDocumentFriendsOnlyInformationRef,
      newDocumentFriendsOnlyData,
    );
    await setDoc(newDocumentPublicInformationRef, newDocumentPublicData);
    await setDoc(newDocumentPostsRef, {});
    await setDoc(newDocumentCommentsRef, {});

    console.log("updated");
  } catch (err) {
    console.log(err);
  }
}
