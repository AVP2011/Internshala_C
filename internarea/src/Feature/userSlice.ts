import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  value: any; // You can replace `any` with a proper user type
}

const initialState: UserState = {
  value: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
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
