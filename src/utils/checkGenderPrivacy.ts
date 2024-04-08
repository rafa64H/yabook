import type {
  publicUser,
  friendsOnlyUser,
  UserRedux,
} from "../types/user-types";

export function checkGenderPrivacy(
  user: publicUser | friendsOnlyUser | UserRedux,
): "publicGender" | "friendsOnlyGender" | "privateGender" {
  const hasFriendsOnlyInfo = "firestoreFriendsOnlyData" in user;

  if (user.firestoreData.gender !== null) {
    return "publicGender";
  }
  if (hasFriendsOnlyInfo && user.firestoreFriendsOnlyData!.gender !== null) {
    return "friendsOnlyGender";
  }

  return "privateGender";
}
