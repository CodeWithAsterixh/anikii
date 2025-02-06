import { createSlice } from "@reduxjs/toolkit";
import { streamInfo } from "./__types";


const initialState: streamInfo = {
  currentlyPlayedSrc:{
    name:"",
    url:""
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