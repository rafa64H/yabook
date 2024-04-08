import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseInit";
import type { firestoreFriendsOnlyData } from "../../../redux/auth/authSlice";

export async function getFriendsOnlyInformationOfUser(userUid: string) {
  try {
    const docRef = doc(
      db,
      "users",
      userUid,
      "information",
      "friendsOnlyInformation",
    );

    const userPublicInformation = await getDoc(docRef).then(
      (docSnap): firestoreFriendsOnlyData | null => {
        if (docSnap.exists()) {
          return docSnap.data().friendsOnlyInformation;
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
