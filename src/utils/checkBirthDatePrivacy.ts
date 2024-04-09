import type {
  PublicUser,
  FriendsOnlyUser,
  UserRedux,
  BirthDatePrivacy,
} from "../types/user-types";

export function checkBirthDatePrivacy(
  user: PublicUser | FriendsOnlyUser | UserRedux,
): BirthDatePrivacy {
  const hasFriendsOnlyInfo = "firestoreFriendsOnlyData" in user;

  if (user.firestoreData.birthDay !== null) {
    return "publicBirthDate";
  }
  if (hasFriendsOnlyInfo && user.firestoreFriendsOnlyData!.birthDay !== null) {
    return "friendsOnlyBirthDate";
  }
  return "privateBirthDate";
}
