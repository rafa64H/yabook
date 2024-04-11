import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebaseInit";
import type {
  BirthDatePrivacy,
  GenderPrivacy,
  UserRedux,
} from "../../../../types/user-types";
import type { DocumentData, DocumentReference } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  sendEmailVerification,
  updateEmail,
  updateProfile,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { reauthenticateUser } from "./reauthenticateUser";

export async function changeInfoOfUser(
  userObjRedux: UserRedux,
  currentGenderPrivacy: GenderPrivacy,
  currentBirthDatePrivacy: BirthDatePrivacy,
  newProfilePicture: string,
  newBackgroundPicture: string,
  newFirstName: string,
  newLastName: string,
  newEmail: string,
  newGender: string,
  newBirthDay: string,
  newBirthMonth: string,
  newBirthYear: string,
) {
  const user = auth.currentUser;

  const publicInformationRef = doc(
    db,
    "users",
    user!.uid,
    "information",
    "publicInformation",
  );

  const friendsOnlyInformationRef = doc(
    db,
    "users",
    user!.uid,
    "information",
    "friendsOnlyInformation",
  );

  const privateInformationRef = doc(
    db,
    "users",
    user!.uid,
    "information",
    "privateInformation",
  );

  const storageProfilePictureRef = ref(
    storage,
    `profilePictures/${user!.uid}/${user!.uid}.jpg`,
  );

  const storageBackgroundPictureRef = ref(
    storage,
    `backgroundPictures/${user!.uid}/${user!.uid}.jpg`,
  );

  try {
    if (currentBirthDatePrivacy === "publicBirthDate") {
      updateDocumentBirthDatePublic(
        publicInformationRef,
        friendsOnlyInformationRef,
        privateInformationRef,
        newBirthDay,
        newBirthMonth,
        newBirthYear,
      );
    }
    if (currentBirthDatePrivacy === "friendsOnlyBirthDate") {
      updateDocumentBirthDateFriendsOnly(
        publicInformationRef,
        friendsOnlyInformationRef,
        privateInformationRef,
        newBirthDay,
        newBirthMonth,
        newBirthYear,
      );
    }
    if (currentBirthDatePrivacy === "privateBirthDate") {
      updateDocumentBirthDatePrivate(
        publicInformationRef,
        friendsOnlyInformationRef,
        privateInformationRef,
        newBirthDay,
        newBirthMonth,
        newBirthYear,
      );
    }

    if (currentGenderPrivacy === "publicGender") {
      updateDocumentGenderPublic(
        publicInformationRef,
        friendsOnlyInformationRef,
        privateInformationRef,
        newGender,
      );
    }
    if (currentGenderPrivacy === "friendsOnlyGender") {
      updateDocumentGenderFriendsOnly(
        publicInformationRef,
        friendsOnlyInformationRef,
        privateInformationRef,
        newGender,
      );
    }
    if (currentGenderPrivacy === "privateGender") {
      updateDocumentGenderPrivate(
        publicInformationRef,
        friendsOnlyInformationRef,
        privateInformationRef,
        newGender,
      );
    }

    if (newProfilePicture !== userObjRedux.photoURL) {
      const profileImage = await fetch(newProfilePicture)
        .then((response) => response.blob())
        .then((blob) => {
          uploadBytes(storageProfilePictureRef, blob);
          return true;
        });

      await getDownloadURL(storageProfilePictureRef)
        .then((url) => {
          updateDoc(publicInformationRef, {
            "publicInformation.photoUrl": url,
          });
          return url;
        })
        .then((url) => {
          updateProfile(user!, {
            photoURL: url,
          });
        });
    }
    if (
      newBackgroundPicture !== userObjRedux.firestoreData.backgroundImageUrl
    ) {
      const backgroundImage = await fetch(newBackgroundPicture)
        .then((response) => response.blob())
        .then((blob) => {
          uploadBytes(storageBackgroundPictureRef, blob);
          return true;
        });

      await getDownloadURL(storageBackgroundPictureRef).then((url) => {
        updateDoc(publicInformationRef, {
          "publicInformation.backgroundImageUrl": url,
        });
      });
    }

    const newFirstNameEqualCurrent =
      newFirstName === userObjRedux.firestoreData.firstName;
    const newLastNameEqualCurrent =
      newLastName === userObjRedux.firestoreData.lastName;

    if (!newFirstNameEqualCurrent) {
      updateDoc(publicInformationRef, {
        "publicInformation.firstName": newFirstName,
      });
    }
    if (!newLastNameEqualCurrent) {
      updateDoc(publicInformationRef, {
        "publicInformation.lastName": newLastName,
      });
    }
    await updateProfile(user!, {
      displayName: `${newFirstNameEqualCurrent ? userObjRedux.firestoreData.firstName : newFirstName} ${newLastNameEqualCurrent ? userObjRedux.firestoreData.lastName : newLastName}`,
    });

    if (newEmail !== userObjRedux.email) {
      await verifyBeforeUpdateEmail(user!, newEmail);
    }
  } catch (err) {
    console.log(err);
  }
}

async function updateDocumentBirthDatePublic(
  publicInformationRef: DocumentReference<DocumentData, DocumentData>,
  friendsOnlyInformationRef: DocumentReference<DocumentData, DocumentData>,
  privateInformationRef: DocumentReference<DocumentData, DocumentData>,
  newBirthDay: string,
  newBirthMonth: string,
  newBirthYear: string,
) {
  try {
    await updateDoc(publicInformationRef, {
      "publicInformation.birthDay": newBirthDay,
      "publicInformation.birthMonth": newBirthMonth,
      "publicInformation.birthYear": newBirthYear,
    });

    await updateDoc(friendsOnlyInformationRef, {
      "friendsOnlyInformation.birthDay": null,
      "friendsOnlyInformation.birthMonth": null,
      "friendsOnlyInformation.birthYear": null,
    });

    await updateDoc(privateInformationRef, {
      "privateInformation.birthDay": null,
      "privateInformation.birthMonth": null,
      "privateInformation.birthYear": null,
    });
  } catch (err) {
    return err;
  }
}

async function updateDocumentBirthDateFriendsOnly(
  publicInformationRef: DocumentReference<DocumentData, DocumentData>,
  friendsOnlyInformationRef: DocumentReference<DocumentData, DocumentData>,
  privateInformationRef: DocumentReference<DocumentData, DocumentData>,
  newBirthDay: string,
  newBirthMonth: string,
  newBirthYear: string,
) {
  try {
    await updateDoc(publicInformationRef, {
      "publicInformation.birthDay": null,
      "publicInformation.birthMonth": null,
      "publicInformation.birthYear": null,
    });

    await updateDoc(friendsOnlyInformationRef, {
      "friendsOnlyInformation.birthDay": newBirthDay,
      "friendsOnlyInformation.birthMonth": newBirthMonth,
      "friendsOnlyInformation.birthYear": newBirthYear,
    });

    await updateDoc(privateInformationRef, {
      "privateInformation.birthDay": null,
      "privateInformation.birthMonth": null,
      "privateInformation.birthYear": null,
    });
  } catch (err) {
    return err;
  }
}

async function updateDocumentBirthDatePrivate(
  publicInformationRef: DocumentReference<DocumentData, DocumentData>,
  friendsOnlyInformationRef: DocumentReference<DocumentData, DocumentData>,
  privateInformationRef: DocumentReference<DocumentData, DocumentData>,
  newBirthDay: string,
  newBirthMonth: string,
  newBirthYear: string,
) {
  try {
    await updateDoc(publicInformationRef, {
      "publicInformation.birthDay": null,
      "publicInformation.birthMonth": null,
      "publicInformation.birthYear": null,
    });

    await updateDoc(friendsOnlyInformationRef, {
      "friendsOnlyInformation.birthDay": null,
      "friendsOnlyInformation.birthMonth": null,
      "friendsOnlyInformation.birthYear": null,
    });

    await updateDoc(privateInformationRef, {
      "privateInformation.birthDay": newBirthDay,
      "privateInformation.birthMonth": newBirthMonth,
      "privateInformation.birthYear": newBirthYear,
    });
  } catch (err) {
    return err;
  }
}

async function updateDocumentGenderPublic(
  publicInformationRef: DocumentReference<DocumentData, DocumentData>,
  friendsOnlyInformationRef: DocumentReference<DocumentData, DocumentData>,
  privateInformationRef: DocumentReference<DocumentData, DocumentData>,
  newGender: string,
) {
  try {
    await updateDoc(publicInformationRef, {
      "publicInformation.gender": newGender,
    });

    await updateDoc(friendsOnlyInformationRef, {
      "friendsOnlyInformation.gender": null,
    });

    await updateDoc(privateInformationRef, {
      "privateInformation.gender": null,
    });
  } catch (err) {
    return err;
  }
}

async function updateDocumentGenderFriendsOnly(
  publicInformationRef: DocumentReference<DocumentData, DocumentData>,
  friendsOnlyInformationRef: DocumentReference<DocumentData, DocumentData>,
  privateInformationRef: DocumentReference<DocumentData, DocumentData>,
  newGender: string,
) {
  try {
    await updateDoc(publicInformationRef, {
      "publicInformation.gender": null,
    });

    await updateDoc(friendsOnlyInformationRef, {
      "friendsOnlyInformation.gender": newGender,
    });

    await updateDoc(privateInformationRef, {
      "privateInformation.gender": null,
    });
  } catch (err) {
    return err;
  }
}

async function updateDocumentGenderPrivate(
  publicInformationRef: DocumentReference<DocumentData, DocumentData>,
  friendsOnlyInformationRef: DocumentReference<DocumentData, DocumentData>,
  privateInformationRef: DocumentReference<DocumentData, DocumentData>,
  newGender: string,
) {
  try {
    await updateDoc(publicInformationRef, {
      "publicInformation.gender": null,
    });

    await updateDoc(friendsOnlyInformationRef, {
      "friendsOnlyInformation.gender": null,
    });

    await updateDoc(privateInformationRef, {
      "privateInformation.gender": newGender,
    });
  } catch (err) {
    return err;
  }
}
