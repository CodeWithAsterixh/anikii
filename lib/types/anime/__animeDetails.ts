import { mediaFormat, seasons, status } from "../__anikii_api";
import { CoverImage } from "./__animeListItem";

export type AnimeInfo = {
  id: number;
  anime_id_external: anime_id_external;
  title: {
    romaji: string;
    english: string;
  };
  synonyms:string[];
  description: string;
  season: {
    type: seasons;
    year: number;
  };
  status: status;
  type: string;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  } | null;
  coverImage: CoverImage;
  popularity: number;
  averageScore: number;
  trending: number;
  episodes: number;
  format: mediaFormat;
  releaseDate: string;
  nextAiringEpisode: nextAiringEpisode | null;
  tags: animeTags[];
  genres: string[];
  studios:string[];
  score_distribution:score_distribution[]
};

export interface score_distribution{
  "score": number,
  "amount": number
}

export interface anime_id_external {
  idGogo: string;
  idGogoDub: string;
  idZoro: string;
  idPahe: string;
}
export interface animeTags {
  rank: number;
  id: number;
  name: string;
  description: string;
  category: string;
}
export interface nextAiringEpisode {
  airingAt: number;
  timeUntilAiring: number;
  episode: number;
}

// types.ts
export interface StreamingLink {
  name: string;
  url: string;
}

export interface EpisodeInfo {
  title: string;
}

export interface AnimeInfoStream {
  title: string;
  category: string;
  episodes:string
}

export interface StreamingEpisode {
  anime_info: AnimeInfoStream;
  episode_info: EpisodeInfo;
  stream_links: StreamingLink[];
  error?: string;
}

export interface ExternalLink {
  url: string;
  type: string;
}

export interface AnimeData {
  episodes: number;
  streamingEpisodes?: {
    title: string;
    thumbnail: string;
    url: string;
    site: string;
  }[];
  externalLinks?: ExternalLink[];
}

export interface AnimeProps {
  data: AnimeData;
}

export type CharacterData = {
  character:character,
  voiceActors:voiceActor[]
};


export interface character {
  id: number;
  role: string;
  name: string;
  image: string;
  gender: string;
  description: string;
  dateOfBirth: {
      month: number;
      day: number;
  };
  age: string;
};
export interface voiceActor{
  name: string;
  language: string;
  image: string;
};
