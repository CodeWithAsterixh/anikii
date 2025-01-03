import { seasons } from "@/lib/types/__anikii_api";
import { AnimeData, AnimeInfo, AnimeProps, StreamingEpisode } from "@/lib/types/anime/__animeDetails";
import { ReleasesType } from "@/lib/types/anime/__releases";
import { createSlice } from "@reduxjs/toolkit";

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
interface responseInfo {
  ok: boolean;
  status: responseStatus;
  pageInfo?: pageInfo;
}
export interface ReleasesRes extends responseInfo {
  data: ReleasesType[];
}
const initialState: ReleasesRes = {
  data: [],
  ok: true,
  status: "not initiated",
};

const PopularRelease = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setPopular: (state, { payload }: { payload: ReleasesRes }) => {
      return payload;
    },
    pushPopular: (state, { payload }: { payload: ReleasesType }) => {
      state.data.push(payload);
    },
  },
});

export const { pushPopular, setPopular } = PopularRelease.actions;

export const PopularRed = PopularRelease.reducer;

// new releases reducers
const NRinitialState: ReleasesRes = {
  data: [],
  ok: true,
  status: "not initiated",
};

const NewReleases = createSlice({
  name: "popular",
  initialState: NRinitialState,
  reducers: {
    setNewRelease: (state, { payload }: { payload: ReleasesRes }) => {
      return payload;
    },
    pushNewRelease: (state, { payload }: { payload: ReleasesType }) => {
      state.data.push(payload);
    },
  },
});

export const { pushNewRelease, setNewRelease } = NewReleases.actions;

export const NewReleasesRed = NewReleases.reducer;

// seasonal

const SEinitialState: ReleasesRes = {
  data: [],
  ok: true,
  status: "not initiated",
};

const Seasoned = createSlice({
  name: "popular",
  initialState: SEinitialState,
  reducers: {
    setSeasoned: (state, { payload }: { payload: ReleasesRes }) => {
      return payload;
    },
    pushSeasoned: (state, { payload }: { payload: ReleasesType }) => {
      state.data.push(payload);
    },
  },
});

export const { pushSeasoned, setSeasoned } = Seasoned.actions;

export const SeasonedRed = Seasoned.reducer;

// season

export interface SEares extends responseInfo {
  data: ReleasesType[];
  season: seasons;
}
const SEUinitialState: SEares = {
  data: [],
  ok: true,
  status: "not initiated",
  season: "SUMMER",
};

const SeasonedAny = createSlice({
  name: "popular",
  initialState: SEUinitialState,
  reducers: {
    setSeasonedAny: (state, { payload }: { payload: SEares }) => {
      return payload;
    },
    pushSeasonedAny: (state, { payload }: { payload: ReleasesType }) => {
      state.data.push(payload);
    },
  },
});

export const { pushSeasonedAny, setSeasonedAny } = SeasonedAny.actions;

export const SeasonedAnyRed = SeasonedAny.reducer;

// search

const Search = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResult: (state, { payload }: { payload: ReleasesRes }) => {
      return payload;
    },
    pushSearchResult: (state, { payload }: { payload: ReleasesType }) => {
      state.data.push(payload);
    },
  },
});

export const { pushSearchResult, setSearchResult } = Search.actions;

export const SearchRed = Search.reducer;

// genre
export interface genreItem {
  genre:string;
  data:ReleasesType[]
}
export interface GenresRes extends responseInfo {
  data: genreItem[];
}
const genreInit: GenresRes = {
  data: [],
  ok: true,
  status: "not initiated",
};

const Genres = createSlice({
  name: "genres",
  initialState:genreInit,
  reducers: {
    setGenresResult: (state, { payload }: { payload: GenresRes }) => {
      return payload;
    },
    pushGenresResult: (state, { payload }: { payload: genreItem }) => {
      state.data.push(payload);
    },
  },
});

export const { pushGenresResult,setGenresResult } = Genres.actions;

export const GenresRed = Genres.reducer;

// genreList

const GenresList = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setGenresListResult: (state, { payload }: { payload: ReleasesRes }) => {
      return payload;
    },
    pushGenresListResult: (state, { payload }: { payload: ReleasesType }) => {
      state.data.push(payload);
    },
  },
});

export const { pushGenresListResult,setGenresListResult } = GenresList.actions;

export const GenresListRed = GenresList.reducer;


// animeinfo
export interface InfoRes extends responseInfo {
  data?: AnimeInfo;
}

const infoInit: InfoRes = {
  ok: true,
  status: "not initiated",
};

const AnimeDetails = createSlice({
  name: "details",
  initialState:infoInit,
  reducers: {
    setAnimeDetails: (state, { payload }: { payload: InfoRes }) => {
      return payload;
    },
  },
});

export const { setAnimeDetails } = AnimeDetails.actions;

export const AnimeDetailsRed = AnimeDetails.reducer;

// stream info

export interface StreamInfoRes {
  data: AnimeProps;
  ok: boolean;
  status: responseStatus;
}

const streamInit: StreamInfoRes = {
  ok: true,
  status: "not initiated",
  data:{
    streamingEpisodesSub:[],
    streamingEpisodesDub:[],
    data:{
      episodes:0,
      streamingEpisodes:[],
      externalLinks:[]
    }
  }
};

const AnimeStream = createSlice({
  name: "stream",
  initialState:streamInit,
  reducers: {
    setAnimeStreamProccess: (state, { payload }: { payload: StreamInfoRes }) => {
      return payload;
    },
    setAnimeStreamMain: (state, { payload }: { payload: AnimeData }) => {
      state.data.data = payload;
    },
    addAnimeStreamSub: (state, { payload }: { payload:StreamingEpisode }) => {
      const subs = [...state.data.streamingEpisodesSub,payload];
      state.data.streamingEpisodesSub = subs;
    },
    addAnimeStreamDub: (state, { payload }: { payload: StreamingEpisode }) => {
      const dubs = [...state.data.streamingEpisodesDub,payload];
      state.data.streamingEpisodesDub = dubs;
    },
  },
});

export const { setAnimeStreamMain,addAnimeStreamDub,addAnimeStreamSub,setAnimeStreamProccess } = AnimeStream.actions;

export const AnimeStreamRed = AnimeStream.reducer;

// currently played

export interface Streaming {
  data?: {
    title: string;
    type: string;
    url: string;
  };
  status:responseStatus|"available"
  ok: boolean;
}

const streamerInit: Streaming = {
  ok: true,
  status: "not initiated",
};

const AnimeStreamer = createSlice({
  name: "stream",
  initialState:streamerInit,
  reducers: {
    setCurrentlyPlayed: (state, { payload }: { payload: Streaming }) => {
      return payload;
    },
  },
});

export const { setCurrentlyPlayed } = AnimeStreamer.actions;

export const AnimeStreamerRed = AnimeStreamer.reducer;
