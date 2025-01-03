// currently played

import { MiniAnimeInfo } from "@/lib/types/anime/__releases";
import { createSlice } from "@reduxjs/toolkit";

interface init {
  favorite: MiniAnimeInfo[];
  recentlyPlayed: MiniAnimeInfo[];
}

const initialState: init = {
  favorite: [],
  recentlyPlayed: [],
};

interface payloadData {
  data: MiniAnimeInfo;
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
          const updated = [...state.favorite, payload.data];
          state.favorite = updated;
          break;
        case "REMOVE":
          const filtered = state.favorite.filter(f => f.id !== payload.data.id);
          state.favorite = filtered;
          break;
        default:
          break;
      }
    },
  },
});

export const { modifyFavorite, setRecentlyPlayed } = UserTracking.actions;

export const UserTracker = UserTracking.reducer;
