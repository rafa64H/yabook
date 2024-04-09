import type {
  PublicUser,
  FriendsOnlyUser,
  UserRedux,
  GenderPrivacy,
} from "../types/user-types";

export function checkGenderPrivacy(
  user: PublicUser | FriendsOnlyUser | UserRedux,
): GenderPrivacy {
  const hasFriendsOnlyInfo = "firestoreFriendsOnlyData" in user;

  if (user.firestoreData.gender !== null) {
    return "publicGender";
  }
  if (hasFriendsOnlyInfo && user.firestoreFriendsOnlyData!.gender !== null) {
    return "friendsOnlyGender";
  }

  return "privateGender";
}
