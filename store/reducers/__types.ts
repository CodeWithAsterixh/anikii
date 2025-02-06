import { AnimeListItem } from "@/lib/types/anime/__animeListItem";

export type responseStatus =
  | "loading"
  | "done"
  | "error"
  | "not initiated"
  | "initiated";
export interface pageInfo {
  lastPage: number;
  currentPage: number;
}
export interface responseInfo {
  ok: boolean;
  status: responseStatus;
}
export interface dataWithPage extends responseInfo {
  data: AnimeListItem[];
  pageInfo?: pageInfo;
}
export interface streamInfo {
  currentlyPlayedSrc?:{
    name:string,
    url:string
  }
  currentlyPlayedDetail?:{
    title:string,
    episodes:string
  }
}

export interface genreListItem{
  genre:string,
  color:string,
}
export interface genreData{
  genre:string,
  items:AnimeListItem[],
}