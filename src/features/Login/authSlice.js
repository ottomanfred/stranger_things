import { createSlice } from '@reduxjs/toolkit';
import api from '../../store/api';

/**
 * These auth endpoints have to be injected _before_ the slice is defined
 * because the slice will attach extra reducers to these endpoints.
 */
const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: 'users/register',
        method: 'POST',
        body: { user },
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.error.message,
    }),
    login: builder.mutation({
      query: (user) => ({
        url: 'users/login',
        method: 'POST',
        body: { user },
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.error.message,
    }),
    verifyUser: builder.query({
      query: (token) => "/test/me",
      transformResponse: (response) => response.data.user.username,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useVerifyUserQuery } = authApi;

/** Session storage key */
const TOKEN_KEY = 'token';

/** Store the payload's token in state and session storage */
const storeToken = (state, { payload }) => {
  state.token = payload.token;
  window.sessionStorage.setItem(TOKEN_KEY, payload.token);
};

/** This slice keeps track of the JWT sent from the API */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: window.sessionStorage.getItem(TOKEN_KEY),
  },
  reducers: {
    /** Logging out simply means wiping the stored token */
    logout: (state) => {
      state.token = null;
      window.sessionStorage.removeItem(TOKEN_KEY);
    },
  },
  // extraReducers allows us to attach callback functions to
  // updates in _other_ slices of the store.
  // These `extraReducers` automatically update the token when
  // the RTK Query mutations are fulfilled.
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
  },
});

export const { logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;