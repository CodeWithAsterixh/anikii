export interface IAnimeTitle {
  romaji?: string;
  english?: string;
  native?: string;
}

export interface ICoverImage {
  cover_image_color?: string;
  cover_image?: string;
  banner_image?: string;
}

export interface ISeason {
  type?: string;
  year?: number;
}

export interface IAnime {
  id: number;
  title: string | IAnimeTitle;
  episodes: number;
  status: string;
  coverImage: ICoverImage;
  format: string;
  popularity: number;
  averageScore: number;
  trending: number;
  releaseDate: number | string;
}

export interface IAnimeDetails extends Omit<IAnime, 'title'> {
  title: IAnimeTitle;
  description: string;
  genres: string[];
  studios: string[];
  duration: number;
  season: ISeason;
  type: string;
  trailer: {
    id?: string;
    site?: string;
    thumbnail?: string;
  };
  tags: string[];
  nextAiringEpisode?: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  };
}
