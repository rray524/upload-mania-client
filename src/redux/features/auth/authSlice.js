import { createSlice } from "@reduxjs/toolkit";

const userName = JSON.parse(localStorage.getItem("userName"));

const initialState = {
  isLoggedIn: false,
  userName: userName ? userName : "",
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_LOGOUT() {
      localStorage.removeItem("userName");
    },
    SET_NAME(state, action) {
      localStorage.setItem("userName", JSON.stringify(action.payload));
      state.userName = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER, SET_LOGOUT } = authSlice.actions;

export default authSlice.reducer;
