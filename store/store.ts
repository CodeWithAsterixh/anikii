import { configureStore } from "@reduxjs/toolkit";
import { UserThemePreferences } from "./reducers/themeReducer";
import { SideBarPreference } from "./reducers/sideBarReducer";
import {
  AnimeDetailsRed,
  AnimeStreamerRed,
  AnimeStreamRed,
  GenresListRed,
  GenresRed,
  NewReleasesRed,
  PopularRed,
  SearchRed,
  SeasonedAnyRed,
  SeasonedRed,
  characterSliceRed,
  recommendedSliceRed
} from "./reducers/listReducer";
import { UserTracker } from "./reducers/trackingReducer";

const store = configureStore({
  reducer: {
    ThemePreference: UserThemePreferences,
    sidebar: SideBarPreference,
    Popular: PopularRed,
    Releases: NewReleasesRed,
    Season: SeasonedRed,
    Season_SEASON: SeasonedAnyRed,
    SearchResult: SearchRed,
    Genres:GenresRed,
    GenresList:GenresListRed,
    AnimeDetails:AnimeDetailsRed,
    AnimeStream:AnimeStreamRed,
    currentlyPlayed:AnimeStreamerRed,
    UserTracker,
    castsInfo:characterSliceRed,
    recommendationsInfo:recommendedSliceRed
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
