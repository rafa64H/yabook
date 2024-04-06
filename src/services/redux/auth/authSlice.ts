import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

interface AuthState {
  user: UserRedux;
}

export const initialState: AuthState = {
  user: {
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    firestoreData: {
      uid: null,
      firstName: null,
      lastName: null,
      email: null,
      photoUrl: null,
      backgroundImageUrl: null,
      gender: null,
      birthDay: null,
      birthMonth: null,
      birthYear: null,
    },
    firestoreFriendsOnlyData: {
      uid: null,
      password: null,
      gender: null,
      birthDay: null,
      birthMonth: null,
      birthYear: null,
    },
    firestorePrivateData: {
      uid: null,
      password: null,
      gender: null,
      birthDay: null,
      birthMonth: null,
      birthYear: null,
    },
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserRedux>) => {
      state.user = action.payload;
    },
    setFirestorePrivateData: (
      state,
      action: PayloadAction<firestorePrivateData>,
    ) => {
      state.user.firestorePrivateData = action.payload;
    },
  },
});

export const { setUser, setFirestorePrivateData } = authSlice.actions;

export default authSlice.reducer;
