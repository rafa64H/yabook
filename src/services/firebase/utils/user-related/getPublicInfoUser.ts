import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseInit";
import type { FirestoreData } from "../../../../types/user-types";

export async function getPublicInformationOfUser(userUid: string) {
  try {
    const docRef = doc(
      db,
      "users",
      userUid,
      "information",
      "publicInformation",
    );

    const userPublicInformation = await getDoc(docRef).then(
      (docSnap): FirestoreData | null => {
        if (docSnap.exists()) {
          return docSnap.data().publicInformation;
        } else {
          return null;
        }
      },
    );

    return userPublicInformation;
  } catch (err) {
    console.log(err);
  }
}
