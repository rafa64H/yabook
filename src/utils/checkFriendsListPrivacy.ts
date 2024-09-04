import type {
  PublicUser,
  FriendsOnlyUser,
  UserRedux,
  FriendsPrivacy,
} from "../types/user-types";

export function checkFriendsListPrivacy(
  user: PublicUser | FriendsOnlyUser | UserRedux,
): FriendsPrivacy {
  const hasFriendsOnlyInfo = "firestoreFriendsOnlyData" in user;

  if (user.firestoreData.friends !== null) {
    return "publicFriendsList";
  }
  if (hasFriendsOnlyInfo && user.firestoreFriendsOnlyData!.friends !== null) {
    return "friendsOnlyFriendsList";
  }
  return "privateFriendsList";
}
