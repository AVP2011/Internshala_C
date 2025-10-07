import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value: null,
};

const userSlice = createSlice({
  name: "user", // ✅ changed from "users" to "user"
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

// ✅ selector now works properly
export const selectUser = (state) => state.user.value;

export default userSlice.reducer;
