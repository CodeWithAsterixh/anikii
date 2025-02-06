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
      const favoriteJson = localStorage.getItem("favorite");
      const favoriteData =favoriteJson ? JSON.parse(favoriteJson) as MiniAnimeInfo[] : []
      if(!favoriteData){
        localStorage.setItem("favorite", JSON.stringify(state.favorite))
      }
      switch (payload.type) {
        case "ADD":
          const updated = [...favoriteData, payload.data];
          localStorage.setItem("favorite", JSON.stringify(updated))
          state.favorite = updated;
          break;
        case "REMOVE":
          const filtered = favoriteData.filter((item) => item.id !== payload.data.id);
          localStorage.setItem("favorite", JSON.stringify(filtered))
          state.favorite = filtered;
          break;
        case "UPDATE":
          state.favorite = favoriteData;
          break;
        default:
          break;
      }
    },
  },
});

export const { modifyFavorite, setRecentlyPlayed } = UserTracking.actions;

export const UserTracker = UserTracking.reducer;
