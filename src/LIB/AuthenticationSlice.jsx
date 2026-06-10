import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,         
  token: null,         
  isAuthenticated: false,
  isLoading: false,
  authError: null,
  selectedRole:null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
    }
  },
});

export const { 
  authActionStart, 
  authActionSuccess, 
  authActionFailure, 
  executeLogout,
  clearAuthErrors ,
  selectRole,
} = authSlice.actions;

export default authSlice.reducer;