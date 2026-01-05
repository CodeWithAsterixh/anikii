export type StreamType = "sub" | "dub" | "hsub";

export interface IStreamLink {
  name: string;
  url: string;
}

export interface IEpisodeInfo {
  title: string;
  thumbnail: string;
  episodes: {
    currentEpisode: number;
    lastEpisode: number;
  };
}

export interface IEpisodeExtra {
  episodesSub: any; // Gogo episode structure
  episodesDub: any;
  animeInfo: IEpisodeInfo;
  meta: {
    episode: number;
    hasSub: boolean;
    hasDub: boolean;
  };
}

export interface IStreamMetadata {
  id: number;
  streamingEpisodes: {
    title: string;
    thumbnail: string;
    url: string;
    site: string;
  }[];
}
