import { configureStore } from "@reduxjs/toolkit";
import { UserPreferences } from "./reducers";

const store = configureStore({
  reducer: {
    UserPreferences: UserPreferences,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
