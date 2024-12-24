export type mediaFormat =
  | "TV"
  | "TV_SHORT"
  | "MOVIE"
  | "SPECIAL"
  | "OVA"
  | "ONA"
  | "MUSIC"
  | "MANGA"
  | "NOVEL"
  | "ONE_SHOT";
export interface ReleasesType {
  id: number;
  title: {
    romaji: string;
    english: string | null; // Nullable if no English title is available
  };
  status:
    | "FINISHED"
    | "RELEASING"
    | "NOT_YET_RELEASED"
    | "CANCELLED"
    | "HIATUS";
  coverImage: {
    extraLarge: string;
    medium: string;
    color: string;
  };
  genres: string[];
  format: mediaFormat;
  episodes: number;
  popularity: number;
  averageScore: number | null; // Nullable if no score is available
  trending: number | null; // Nullable if not trending
  isAdult: boolean;
  nextAiringEpisode: {
    airingAt: number; // Unix timestamp
    episode: number;
  } | null; // Nullable if there is no next airing episode
}
