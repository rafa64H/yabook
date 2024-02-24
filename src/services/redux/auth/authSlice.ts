import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserRedux = {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  firestoreData: {
    gender: string | null;
    backgroundImageUrl: string | null;
    birthday: string | null;
    birthMonth: string | null;
    birthYear: string | null;
  };
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
      gender: null,
      backgroundImageUrl: null,
      birthday: null,
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
