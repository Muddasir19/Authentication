import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/global";



//createApi is a function from Redux Toolkit that helps create an API slice.
export const AuthApi = createApi({

  //createApi is a function from Redux Toolkit that helps create an API slice.
  reducerPath: "auth",

  //baseQuery configures the base settings for making API requests
  baseQuery: fetchBaseQuery({

    //baseUrl: sets the base URL for all API requests.
    baseUrl: BASE_URL,

    //prepareHeaders is a function that adds an authorization header (Bearer token) to each request if there is an apiToken available in the Redux store.
    prepareHeaders: (headers, { getState }) => {
      const apiToken = getState().storeAuth.apiToken;
      if (apiToken) {
        headers.set("Authorization", `Bearer ${apiToken}`);
      }
      return headers;
    },
  }),

  tagTypes: ['profile'],


//   query: (userData) => ({ ... }) defines how each request is constructed.
// url specifies the endpoint relative to BASE_URL.
// method specifies the HTTP method (POST for sending data).
// body (userData) contains data to be sent in the request body.
// headers specifies additional headers (Accept: "application/json").
  endpoints: (builder) => ({

    checkPhone: builder.mutation({
      query: (userData) => ({
        url: "check/phone",
        method: "POST",
        body: userData,
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    userRegister: builder.mutation({
      query: (userData) => ({
        url: "register/phone",
        method: "POST",
        body: userData,
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    userLogin: builder.mutation({
      query: (userData) => ({
        url: "login",
        method: "POST",
        body: userData,
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    userLogout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    getProfile: builder.query({
      query: (id) => `profiles/${id}`,
      providesTags: ['profile']
    }),

    // updateProfile: builder.mutation({
    //   query: (userData) => ({
    //     url: "/profile/:id?_method=PUT",
    //     method: "POST",
    //     body: userData,
    //     headers: {
    //       Accept: "application/json",
    //     },
    //   }),
    // }),
    
    
    updateProfile: builder.mutation({
      query: ({id, profileData}) => ({
        url: `profiles/${id}?_method=PUT`,
        method: "POST",
        body: profileData,
        headers: {
          Accept: "application/json",
        },
        
      }),
      invalidatesTags: ['profile']
    }),

    changePassword: builder.mutation({
      query: (userData) => ({
        url: "change-password",
        method: "POST",
        body:userData,
        headers: {
          Accept: "application/json",
        },
      }),

    }),


    
  }),
});

// useCheckPhoneMutation, useUserRegisterMutation, etc., are generated hooks provided by createApi.
// These hooks simplify making API requests and handle state updates related to those requests.
export const {
  useCheckPhoneMutation,
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = AuthApi;
