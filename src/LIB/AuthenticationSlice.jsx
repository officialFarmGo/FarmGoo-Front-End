import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  id: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  authError: null,
  selectedRole: null,
  activeMenuItem: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    activeMenuItem: (state, action) => {
      state.activeMenuItem = action.payload;
    },
    authActionStart: (state) => {
      state.isLoading = true;
      state.authError = null;
    },
    authActionSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authError = null;
    },
    authToken: (state, action) => {
      state.token = action.payload;
    },
    authUser: (state, action) => {
      state.user = action.payload;
    },
    authActionFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.authError = action.payload;
    },
    executeLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.authError = null;
    },
    clearAuthErrors: (state) => {
      state.authError = null;
    },

    selectRole: (state, action) => {
      state.selectedRole = action.payload;
    },

    getId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const {
  authActionStart,
  authActionSuccess,
  authToken,
  authUser,
  authActionFailure,
  executeLogout,
  clearAuthErrors,
  selectRole,
  activeMenuItem,
  getId,
} = authSlice.actions;

export default authSlice.reducer;
