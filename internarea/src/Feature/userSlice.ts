import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  uid: string;
  name?: string;
  email: string | null;
  phone?: string | null;        // renamed from phoneNumber
  college?: string | null;
  location?: string | null;
  photo?: string | null;
}


interface UserState {
  value: UserData | null;
}

const initialState: UserState = {
  value: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.value;
export default userSlice.reducer;
