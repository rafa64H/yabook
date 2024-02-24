import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseInit";

export async function getPublicInformationOfUser(userUid: string) {
  try {
    const docRef = doc(db, "users", userUid);

    const userPublicInformation = await getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        return docSnap.data().publicInformation;
      } else {
        console.log("No doc exists");
      }
    });

    return userPublicInformation;
  } catch (err) {
    console.log(err);
  }
}
