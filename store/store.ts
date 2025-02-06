import { configureStore } from "@reduxjs/toolkit";

import { SideBarPreference } from "./reducers/sideBarReducer";
import { UserThemePreferences } from "./reducers/themeReducer";
import { UserTracker } from "./reducers/trackingReducer";
import { GenreListAnimeRed, GenreListRed } from "./reducers/animeListReducer";
import { currentStreamInfoRed } from "./reducers/streamingReducer";

const store = configureStore({
  reducer: {
    ThemePreference: UserThemePreferences,
    sidebar: SideBarPreference,
    UserTracker,
    GenreList:GenreListRed,
    GenreListAnime:GenreListAnimeRed,
    currentStreamInfo:currentStreamInfoRed
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
