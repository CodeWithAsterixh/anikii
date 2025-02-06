import { createSlice } from "@reduxjs/toolkit";
import { genreData, genreListItem, responseStatus } from "./__types";


const initialState: genreListItem[] = []
  

  const GenreList = createSlice({
    name: "genre",
    initialState,
    reducers: {
      setGenres: (state, { payload }: { payload: genreListItem[] }) => {
        return payload;
      }
    },
  });
  
  export const { setGenres } = GenreList.actions;
  
  /**popular releases reducer */
  export const GenreListRed = GenreList.reducer;



const initialStateItem:{
  data:genreData[],
  status:responseStatus
}  = {
  data:[],
  status:"not initiated"
}
  
  const GenreListAnime = createSlice({
    name: "genre",
    initialState:initialStateItem,
    reducers: {
      addItem: (state, { payload }: { payload: genreData }) => {
        state.data = [...state.data,payload]
        // return [...state,payload]
      },
      setStatus: (state, { payload }: { payload: responseStatus }) => {
        state.status = payload
        // return [...state,payload]
      }
    },
  });
  
  export const { addItem,setStatus } = GenreListAnime.actions;
  
  /**popular releases reducer */
  export const GenreListAnimeRed = GenreListAnime.reducer;