import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseInit";
import type {
  BirthDatePrivacy,
  GenderPrivacy,
  UserRedux,
} from "../../../../types/user-types";

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

  try {
  } catch (err) {
    console.log(err);
  }
}
