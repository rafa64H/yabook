import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseInit";
import type { firestorePrivateData } from "../../../redux/auth/authSlice";

export async function getPrivateInformationOfUser(userUid: string) {
  try {
    const docRef = doc(
      db,
      "users",
      userUid,
      "information",
      "privateInformation",
    );

    const userPublicInformation = await getDoc(docRef).then(
      (docSnap): firestorePrivateData | null => {
        if (docSnap.exists()) {
          return docSnap.data().privateInformation;
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
