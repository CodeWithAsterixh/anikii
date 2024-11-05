export interface anilistTrending {
  id: number;
  status: string;
  title: {
    userPreferred: string;
    romaji: string;
    english: string;
    native: string;
  };
  genres: string[];
  description: string;
  format: string;
  bannerImage: string;
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  episodes: number;
  meanScore: number;
  season: string;
  seasonYear: number;
  averageScore: number;
}
export interface gogoPopular {
  title: string;
  releaseDate: string;
  image: string;
  img: string;
  link: string;
  id: string;
}
export type AnimeTrending = {
  anilistTrending: anilistTrending[];
  gogoPopular: gogoPopular[];
};

//   episode and streamers

export interface Source {
  file: string;
  label: string;
  type: string;
}

export interface Stream {
  Referer: string;
  sources: Source[];
  sources_bk: Source[];
}

export interface Servers {
  vidcdn: string;
  streamwish: string;
  mp4upload: string;
  doodstream: string;
  vidhide: string;
}

export interface AnimeEpisode {
  name: string;
  episodes: string;
  stream: Stream;
  servers: Servers;
}

// anime

interface Title {
  english: string | null;
  native: string | null;
  romaji: string;
  userPreferred: string;
}

interface CoverImage {
  extraLarge: string;
  large: string;
  color: string;
}
export interface Anime {
  id: number | string; // Supports both number and string ID types
  title: Title;
  name: string;
  coverImage: CoverImage;
  bannerImage: string | null;
  season: string;
  seasonYear?: number; // Optional, as this is not in the second object
  description: string;
  type: string;
  format?: string; // Optional, as this is not in the second object
  status: string;
  episodes: string[] | number;
  genres?: string[]; // Optional, since it may not be available in the second object
  averageScore?: number; // Optional, since it may not be available in the second object
  popularity?: number; // Optional, since it may not be available in the second object
  meanScore?: number; // Optional, since it may not be available in the second object
  recommendations?: []; // Optional, since it may not be available in the second object
  source: string;
  image?: string; // Optional, to accommodate the image field from the second object
  plot_summary?: string; // Optional, to accommodate the plot_summary field from the second object
  genre?: string; // Optional, to accommodate the genre field from the second object
  released?: string; // Optional, to accommodate the released field from the second object
  other_name?: string; // Optional, to accommodate the other_name field from the second object
}
