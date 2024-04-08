export type firestorePrivateData = {
  uid: string | null;
  password: string | null;
  gender: string | null;
  birthDay: string | null;
  birthMonth: string | null;
  birthYear: string | null;
};

export type firestoreFriendsOnlyData = {
  uid: string | null;
  password: string | null;
  gender: string | null;
  birthDay: string | null;
  birthMonth: string | null;
  birthYear: string | null;
};

export type firestoreData = {
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
  firestoreData: firestoreData;
  firestoreFriendsOnlyData: firestoreFriendsOnlyData;
  firestorePrivateData: firestorePrivateData;
};

export type publicUser = {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  firestoreData: firestoreData;
};

export type friendsOnlyUser = {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  firestoreData: firestoreData;
  firestoreFriendsOnlyData: firestoreFriendsOnlyData;
};
