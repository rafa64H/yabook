export type FirestorePrivateData = {
  uid: string | null;
  password: string | null;
  gender: string | null;
  birthDay: string | null;
  birthMonth: string | null;
  birthYear: string | null;
};

export type FirestoreFriendsOnlyData = {
  uid: string | null;
  password: string | null;
  gender: string | null;
  birthDay: string | null;
  birthMonth: string | null;
  birthYear: string | null;
};

export type FirestoreData = {
  uid: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  photoUrl: string | null;
  backgroundImageUrl: string | null;
  gender: string | null;
  birthDay: string | null;
  birthMonth: string | null;
  birthYear: string | null;
};

export type UserRedux = {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  firestoreData: FirestoreData;
  firestoreFriendsOnlyData: FirestoreFriendsOnlyData;
  firestorePrivateData: FirestorePrivateData;
};

export type PublicUser = {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  firestoreData: FirestoreData;
};

export type FriendsOnlyUser = {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  firestoreData: FirestoreData;
  firestoreFriendsOnlyData: FirestoreFriendsOnlyData;
};

export type GenderPrivacy =
  | "publicGender"
  | "friendsOnlyGender"
  | "privateGender";
export type BirthDatePrivacy =
  | "publicBirthDate"
  | "friendsOnlyBirthDate"
  | "privateBirthDate";
