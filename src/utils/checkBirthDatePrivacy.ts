import type {
  publicUser,
  friendsOnlyUser,
  UserRedux,
} from "../types/user-types";

export function checkBirthDatePrivacy(
  user: publicUser | friendsOnlyUser | UserRedux,
): "publicBirthDate" | "friendsOnlyBirthDate" | "privateBirthDate" {
  const hasFriendsOnlyInfo = "firestoreFriendsOnlyData" in user;

  if (user.firestoreData.birthDay !== null) {
    return "publicBirthDate";
  }
  if (hasFriendsOnlyInfo && user.firestoreFriendsOnlyData!.birthDay !== null) {
    return "friendsOnlyBirthDate";
  }
  return "privateBirthDate";
}
