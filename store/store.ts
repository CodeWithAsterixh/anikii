import { configureStore } from "@reduxjs/toolkit";
import { UserThemePreferences } from "./reducers/themeReducer";
import { SideBarPreference } from "./reducers/sideBarReducer";

const store = configureStore({
  reducer: {
    ThemePreference: UserThemePreferences,
    sidebar: SideBarPreference,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
