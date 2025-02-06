import { createSlice } from "@reduxjs/toolkit";
import { dataWithPage, streamInfo } from "./__types";
import { AnimeListItem } from "@/lib/types/anime/__animeListItem";


const initialState: streamInfo = {
   currentlyPlayed:{
    srcName:"",
    srcUrl:""
   }
  };
  

  const currentStreamInfo = createSlice({
    name: "genre",
    initialState,
    reducers: {
      setCurrentStream: (state, { payload }: { payload: streamInfo }) => {
        return payload;
      }
    },
  });
  
  export const { setCurrentStream } = currentStreamInfo.actions;
  
  /**popular releases reducer */
  export const currentStreamInfoRed = currentStreamInfo.reducer;