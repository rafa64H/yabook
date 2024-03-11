import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserRedux>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
