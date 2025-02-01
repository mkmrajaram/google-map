import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/location/locationSlice";
export const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
