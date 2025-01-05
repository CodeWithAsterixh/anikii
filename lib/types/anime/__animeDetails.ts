export type AnimeInfo = {
  data: {
    id: number;
    title: {
      romaji: string;
      english: string;
      native: string;
    };
    description: string;
    season: string;
    seasonYear: number;
    status: string;
    type: string;
    idMal: number;
    trailer: {
      id: string;
      site: string;
      thumbnail: string;
    } | null;
    coverImage: {
      extraLarge: string;
      medium: string;
      color: string | null;
    };
    bannerImage: string | null;
    popularity: number;
    trending: number;
    episodes: number;
    updatedAt: number;
    format: string;
    startDate: {
      year: number;
      month: number;
      day: number;
    };
    endDate: {
      year: number;
      month: number;
      day: number;
    } | null;
    nextAiringEpisode: unknown | null;
    tags: {
      rank: number;
      id: number;
      name: string;
      description: string;
      category: string;
    }[];
    genres: string[];
  };
  idSub: {
    id_provider: {
      idGogo: string;
      idGogoDub: string;
      idZoro: string;
      idPahe: string;
    };
    is_dub: boolean;
  };
};

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
  streamingEpisodes: {
    title: string;
    thumbnail: string;
    url: string;
    site: string;
  }[];
  externalLinks: ExternalLink[];
}


export interface AnimeProps {
  data: AnimeData;
}

export type CharacterData = {
  id: number;
  name: {
    full: string;
    native: string;
    alternative: string[];
    userPreferred: string;
  };
  image: {
    medium: string;
  };
  gender: string;
  role: string;
  voiceActors: {
    name: {
      full: string;
    };
    languageV2: string;
    image: {
      medium: string;
    };
  }[];
};
