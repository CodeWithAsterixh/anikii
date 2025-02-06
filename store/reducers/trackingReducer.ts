// currently played

import { AnimeListItem } from "@/lib/types/anime/__animeListItem";
import { createSlice } from "@reduxjs/toolkit";

interface init {
  favorite: AnimeListItem[];
  recentlyPlayed: AnimeListItem[];
}

const initialState: init = {
  favorite: [],
  recentlyPlayed: [],
};

interface payloadData {
  data: AnimeListItem;
  type: "ADD" | "REMOVE" | "UPDATE";
}

const UserTracking = createSlice({
  name: "stream",
  initialState,
  reducers: {
    setRecentlyPlayed: (state, { payload }: { payload: payloadData }) => {
      switch (payload.type) {
        case "ADD":
          state.recentlyPlayed.push(payload.data);
          break;
        case "REMOVE":
          state.recentlyPlayed.push(payload.data);
          break;
        default:
          break;
      }
    },
    modifyFavorite: (state, { payload }: { payload: payloadData }) => {
      switch (payload.type) {
        case "ADD":
          state.favorite.push(payload.data);
          break;
        case "REMOVE":
          state.favorite.filter(f => f.id !== payload.data.id);
          break;
        default:
          break;
      }
    },
  },
});

export const { modifyFavorite, setRecentlyPlayed } = UserTracking.actions;

export const UserTracker = UserTracking.reducer;
