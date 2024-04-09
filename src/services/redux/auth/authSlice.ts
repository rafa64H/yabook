import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  UserRedux,
  FirestoreData,
  FirestoreFriendsOnlyData,
  FirestorePrivateData,
} from "../../../types/user-types";

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
      action: PayloadAction<FirestorePrivateData>,
    ) => {
      state.user.firestorePrivateData = action.payload;
    },
  },
});

export const { setUser, setFirestorePrivateData } = authSlice.actions;

export default authSlice.reducer;
