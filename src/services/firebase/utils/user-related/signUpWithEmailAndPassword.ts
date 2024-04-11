import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebaseInit";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

    const storageProfilePictureRef = ref(
      storage,
      `profilePictures/${user!.uid}/${user!.uid}.jpg`,
    );

    const storageBackgroundPictureRef = ref(
      storage,
      `backgroundPictures/${user!.uid}/${user!.uid}.jpg`,
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
      "backgroundPictures/withoutBackgroundPicture/no-background-image.jpg",
    );

    let backgroundImageUrl = "";

    await getDownloadURL(withoutBackgroundImageRef).then((url) => {
      backgroundImageUrl = url;
    });

    const emptyBlob = new Blob([""], { type: "image/jpeg" });

    await uploadBytes(storageProfilePictureRef, emptyBlob);
    await uploadBytes(storageBackgroundPictureRef, emptyBlob);

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

    await sendEmailVerification(user);

    console.log("updated");
  } catch (err) {
    console.log(err);
  }
}
