import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authSlice from "./slices/authSlices";
import { AuthApi } from "./api/authApi";




export const store = configureStore({
  reducer: {
    storeAuth: authSlice,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(AuthApi.middleware),
});

setupListeners(store.dispatch);
