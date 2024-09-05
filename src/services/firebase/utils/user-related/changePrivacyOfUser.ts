import { doc, updateDoc } from "firebase/firestore";
import type { DocumentData, DocumentReference } from "firebase/firestore";
import type {
  BirthDatePrivacy,
  FriendsPrivacy,
  GenderPrivacy,
  UserRedux,
} from "../../../../types/user-types";
import { db } from "../../firebaseInit";
import { store } from "../../../redux/store";

export default async function changePrivacyOfUser(
  newBirthDatePrivacy: BirthDatePrivacy,
  currentBirthDatePrivacy: BirthDatePrivacy,
  newFriendsListPrivacy: FriendsPrivacy,
  currentFriendsListPrivacy: FriendsPrivacy,
  newGenderPrivacy: GenderPrivacy,
  currentGenderPrivacy: GenderPrivacy,
  userObjRedux: UserRedux,
) {
  const publicInformationRef = doc(
    db,
    "users",
    `${userObjRedux.uid}`,
    "information",
    "publicInformation",
  );

  const friendsOnlyInformationRef = doc(
    db,
    "users",
    `${userObjRedux.uid}`,
    "information",
    "friendsOnlyInformation",
  );

  const privateInformationRef = doc(
    db,
    "users",
    `${userObjRedux.uid}`,
    "information",
    "privateInformation",
  );

  await changeGenderPrivacyOfUser(
    newGenderPrivacy,
    currentGenderPrivacy,
    publicInformationRef,
    friendsOnlyInformationRef,
    privateInformationRef,
    userObjRedux,
  );

  await changeBirthDatePrivacyOfUser(
    newBirthDatePrivacy,
    currentBirthDatePrivacy,
    publicInformationRef,
    friendsOnlyInformationRef,
    privateInformationRef,
    userObjRedux,
  );

  await changeFriendsListPrivacyOfUser(
    newFriendsListPrivacy,
    currentFriendsListPrivacy,
    publicInformationRef,
    friendsOnlyInformationRef,
    privateInformationRef,
    userObjRedux,
  );
}

async function changeGenderPrivacyOfUser(
  newGenderPrivacy: GenderPrivacy,
  currentGenderPrivacy: GenderPrivacy,
  publicInformationRef: DocumentReference<DocumentData, DocumentData>,
  friendsOnlyInformationRef: DocumentReference<DocumentData, DocumentData>,
  privateInformationRef: DocumentReference<DocumentData, DocumentData>,
  userObjRedux: UserRedux,
) {
  console.log(currentGenderPrivacy, newGenderPrivacy, userObjRedux);

  try {
    if (newGenderPrivacy === currentGenderPrivacy) {
      console.log("hola");
      return;
    }
    if (newGenderPrivacy === "publicGender") {
      let currentGenderInfo = "";

      switch (currentGenderPrivacy) {
        case "friendsOnlyGender":
          currentGenderInfo = userObjRedux.firestoreFriendsOnlyData.gender!;
          await updateDoc(friendsOnlyInformationRef, {
            "friendsOnlyInformation.gender": null,
          });
          break;
        case "privateGender":
          currentGenderInfo = userObjRedux.firestorePrivateData.gender!;
          await updateDoc(privateInformationRef, {
            "privateInformation.gender": null,
          });
          break;
      }

      await updateDoc(publicInformationRef, {
        "publicInformation.gender": currentGenderInfo,
      });

      console.log("done");
    }
    if (newGenderPrivacy === "friendsOnlyGender") {
      let currentGenderInfo = "";

      switch (currentGenderPrivacy) {
        case "publicGender":
          currentGenderInfo = userObjRedux.firestoreData.gender!;
          await updateDoc(publicInformationRef, {
            "publicInformation.gender": null,
          });
          break;
        case "privateGender":
          currentGenderInfo = userObjRedux.firestorePrivateData.gender!;
          await updateDoc(privateInformationRef, {
            "privateInformation.gender": null,
          });
          break;
      }

      await updateDoc(friendsOnlyInformationRef, {
        "friendsOnlyInformation.gender": currentGenderInfo,
      });

      console.log("done");
    }
    if (newGenderPrivacy === "privateGender") {
      let currentGenderInfo = "";

      switch (currentGenderPrivacy) {
        case "publicGender":
          currentGenderInfo = userObjRedux.firestoreData.gender!;
          await updateDoc(publicInformationRef, {
            "publicInformation.gender": null,
          });
          break;
        case "friendsOnlyGender":
          currentGenderInfo = userObjRedux.firestoreFriendsOnlyData.gender!;
          await updateDoc(friendsOnlyInformationRef, {
            "friendsOnlyInformation.gender": null,
          });
          break;
      }

      await updateDoc(privateInformationRef, {
        "privateInformation.gender": currentGenderInfo,
      });

      console.log("done");
    }
  } catch (err) {
    console.log(err);
  }
}

async function changeBirthDatePrivacyOfUser(
  newBirthDatePrivacy: BirthDatePrivacy,
  currentBirthDatePrivacy: BirthDatePrivacy,
  publicInformationRef: DocumentReference<DocumentData, DocumentData>,
  friendsOnlyInformationRef: DocumentReference<DocumentData, DocumentData>,
  privateInformationRef: DocumentReference<DocumentData, DocumentData>,
  userObjRedux: UserRedux,
) {
  console.log(currentBirthDatePrivacy, newBirthDatePrivacy);

  try {
    if (newBirthDatePrivacy === currentBirthDatePrivacy) {
      console.log("hola");
      return;
    }
    if (newBirthDatePrivacy === "publicBirthDate") {
      let currentBirthDayInfo = "";
      let currentBirthMonthInfo = "";
      let currentBirthYearInfo = "";

      switch (currentBirthDatePrivacy) {
        case "friendsOnlyBirthDate":
          currentBirthDayInfo = userObjRedux.firestoreFriendsOnlyData.birthDay!;
          currentBirthMonthInfo =
            userObjRedux.firestoreFriendsOnlyData.birthMonth!;
          currentBirthYearInfo =
            userObjRedux.firestoreFriendsOnlyData.birthYear!;

          await updateDoc(friendsOnlyInformationRef, {
            "friendsOnlyInformation.birthDay": null,
            "friendsOnlyInformation.birthMonth": null,
            "friendsOnlyInformation.birthYear": null,
          });
          break;
        case "privateBirthDate":
          currentBirthDayInfo = userObjRedux.firestorePrivateData.birthDay!;
          currentBirthMonthInfo = userObjRedux.firestorePrivateData.birthMonth!;
          currentBirthYearInfo = userObjRedux.firestorePrivateData.birthYear!;
          await updateDoc(privateInformationRef, {
            "privateInformation.birthDay": null,
            "privateInformation.birthMonth": null,
            "privateInformation.birthYear": null,
          });
          break;
      }

      await updateDoc(publicInformationRef, {
        "publicInformation.birthDay": currentBirthDayInfo,
        "publicInformation.birthMonth": currentBirthMonthInfo,
        "publicInformation.birthYear": currentBirthYearInfo,
      });

      console.log("done");
    }
    if (newBirthDatePrivacy === "friendsOnlyBirthDate") {
      let currentBirthDayInfo = "";
      let currentBirthMonthInfo = "";
      let currentBirthYearInfo = "";

      switch (currentBirthDatePrivacy) {
        case "publicBirthDate":
          currentBirthDayInfo = userObjRedux.firestoreData.birthDay!;
          currentBirthMonthInfo = userObjRedux.firestoreData.birthMonth!;
          currentBirthYearInfo = userObjRedux.firestoreData.birthYear!;
          await updateDoc(publicInformationRef, {
            "publicInformation.birthDay": null,
            "publicInformation.birthMonth": null,
            "publicInformation.birthYear": null,
          });
          break;
        case "privateBirthDate":
          currentBirthDayInfo = userObjRedux.firestorePrivateData.birthDay!;
          currentBirthMonthInfo = userObjRedux.firestorePrivateData.birthMonth!;
          currentBirthYearInfo = userObjRedux.firestorePrivateData.birthYear!;
          await updateDoc(privateInformationRef, {
            "privateInformation.birthDay": null,
            "privateInformation.birthMonth": null,
            "privateInformation.birthYear": null,
          });
          break;
      }

      await updateDoc(friendsOnlyInformationRef, {
        "friendsOnlyInformation.birthDay": currentBirthDayInfo,
        "friendsOnlyInformation.birthMonth": currentBirthMonthInfo,
        "friendsOnlyInformation.birthYear": currentBirthYearInfo,
      });

      console.log("done");
    }
    if (newBirthDatePrivacy === "privateBirthDate") {
      let currentBirthDayInfo = "";
      let currentBirthMonthInfo = "";
      let currentBirthYearInfo = "";

      switch (currentBirthDatePrivacy) {
        case "publicBirthDate":
          currentBirthDayInfo = userObjRedux.firestoreData.birthDay!;
          currentBirthMonthInfo = userObjRedux.firestoreData.birthMonth!;
          currentBirthYearInfo = userObjRedux.firestoreData.birthYear!;
          await updateDoc(publicInformationRef, {
            "publicInformation.birthDay": null,
            "publicInformation.birthMonth": null,
            "publicInformation.birthYear": null,
          });
          break;
        case "friendsOnlyBirthDate":
          currentBirthDayInfo = userObjRedux.firestoreFriendsOnlyData.birthDay!;
          currentBirthMonthInfo =
            userObjRedux.firestoreFriendsOnlyData.birthMonth!;
          currentBirthYearInfo =
            userObjRedux.firestoreFriendsOnlyData.birthYear!;
          await updateDoc(friendsOnlyInformationRef, {
            "friendsOnlyInformation.birthDay": null,
            "friendsOnlyInformation.birthMonth": null,
            "friendsOnlyInformation.birthYear": null,
          });
          break;
      }

      await updateDoc(privateInformationRef, {
        "privateInformation.birthDay": currentBirthDayInfo,
        "privateInformation.birthMonth": currentBirthMonthInfo,
        "privateInformation.birthYear": currentBirthYearInfo,
      });

      console.log("done");
    }
  } catch (err) {
    console.log(err);
  }
}

async function changeFriendsListPrivacyOfUser(
  newFriendsListPrivacy: FriendsPrivacy,
  currentFriendsListPrivacy: FriendsPrivacy,
  publicInformationRef: DocumentReference<DocumentData, DocumentData>,
  friendsOnlyInformationRef: DocumentReference<DocumentData, DocumentData>,
  privateInformationRef: DocumentReference<DocumentData, DocumentData>,
  userObjRedux: UserRedux,
) {
  console.log(currentFriendsListPrivacy, newFriendsListPrivacy);

  try {
    if (newFriendsListPrivacy === currentFriendsListPrivacy) {
      console.log("hola");
      return;
    }
    if (newFriendsListPrivacy === "publicFriendsList") {
      let currentFriendsListInfo = [] as string[];

      switch (currentFriendsListPrivacy) {
        case "friendsOnlyFriendsList":
          currentFriendsListInfo =
            userObjRedux.firestoreFriendsOnlyData.friends!;
          await updateDoc(friendsOnlyInformationRef, {
            "friendsOnlyInformation.friends": null,
          });
          break;
        case "privateFriendsList":
          currentFriendsListInfo = userObjRedux.firestorePrivateData.friends!;
          await updateDoc(privateInformationRef, {
            "privateInformation.friends": null,
          });
          break;
      }

      await updateDoc(publicInformationRef, {
        "publicInformation.friends": currentFriendsListInfo,
      });

      console.log("done");
    }
    if (newFriendsListPrivacy === "friendsOnlyFriendsList") {
      let currentFriendsListInfo = [] as string[];

      switch (currentFriendsListPrivacy) {
        case "publicFriendsList":
          currentFriendsListInfo = userObjRedux.firestoreData.friends!;
          await updateDoc(publicInformationRef, {
            "publicInformation.friends": null,
          });
          break;
        case "privateFriendsList":
          currentFriendsListInfo = userObjRedux.firestorePrivateData.friends!;
          await updateDoc(privateInformationRef, {
            "privateInformation.friends": null,
          });
          break;
      }

      await updateDoc(friendsOnlyInformationRef, {
        "friendsOnlyInformation.friends": currentFriendsListInfo,
      });

      console.log("done");
    }
    if (newFriendsListPrivacy === "privateFriendsList") {
      let currentFriendsListInfo = [] as string[];

      switch (currentFriendsListPrivacy) {
        case "publicFriendsList":
          currentFriendsListInfo = userObjRedux.firestoreData.friends!;
          await updateDoc(publicInformationRef, {
            "publicInformation.friends": null,
          });
          break;
        case "friendsOnlyFriendsList":
          currentFriendsListInfo =
            userObjRedux.firestoreFriendsOnlyData.friends!;
          await updateDoc(friendsOnlyInformationRef, {
            "friendsOnlyInformation.friends": null,
          });
          break;
      }

      await updateDoc(privateInformationRef, {
        "privateInformation.friends": currentFriendsListInfo,
      });

      console.log("done");
    }
  } catch (err) {
    console.log(err);
  }
}
