import type { User } from "firebase/auth";
import { getFriendsOnlyInformationOfUser } from "../services/firebase/utils/user-related/getFriendsOnlyInfoUser";
import { getPrivateInformationOfUser } from "../services/firebase/utils/user-related/getPrivateInfoUser";
import { getPublicInformationOfUser } from "../services/firebase/utils/user-related/getPublicInfoUser";
import type {
  FirestoreData,
  FirestoreFriendsOnlyData,
  FirestorePrivateData,
  UserRedux,
} from "../types/user-types";
import { reauthenticateUser } from "../services/firebase/utils/user-related/reauthenticateUser";
import { store } from "../services/redux/store";
import { setUser } from "../services/redux/auth/authSlice";

export default async function setUserReduxStore(user: User) {
  try {
    const { uid, displayName, email, photoURL } = user;

    const firestoreData = await getPublicInformationOfUser(user.uid);
    const firestorePrivateData = await getPrivateInformationOfUser(user.uid);

    const firestoreFriendsOnlyData = await getFriendsOnlyInformationOfUser(
      user.uid,
    );

    if (!firestoreData) {
      return;
    }
    if (!firestorePrivateData) {
      return;
    }
    if (!firestoreFriendsOnlyData) {
      return;
    }
    const userObjRedux: UserRedux = {
      uid,
      displayName,
      email,
      photoURL,
      firestoreData: firestoreData as FirestoreData,
      firestorePrivateData: firestorePrivateData as FirestorePrivateData,
      firestoreFriendsOnlyData:
        firestoreFriendsOnlyData as FirestoreFriendsOnlyData,
    };

    store.dispatch(setUser(userObjRedux));

    reauthenticateUser(userObjRedux.firestorePrivateData.password!);
  } catch (error) {
    console.log(error);
  }
}
