import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const COHORT = '2309-FSA-ET-WEB-FT-SF';

/**
 * This is the main hub for all of our API connections.
 */
const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://strangers-things.herokuapp.com/api/${COHORT}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      token && headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;