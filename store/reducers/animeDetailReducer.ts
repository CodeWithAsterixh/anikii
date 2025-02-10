import { AnimeInfo } from "@/lib/types/anime/__animeDetails";
import { createSlice } from "@reduxjs/toolkit";


const initialState: {
    data?:AnimeInfo;
} ={
}
  

  const animeInfo = createSlice({
    name: "genre",
    initialState,
    reducers: {
      setInfo: (state, { payload }: { payload: AnimeInfo }) => {
        state.data= payload;
      },
    },
  });
  
  export const { setInfo } = animeInfo.actions;
  
  /**popular releases reducer */
  export const AnimeInfoRed = animeInfo.reducer;