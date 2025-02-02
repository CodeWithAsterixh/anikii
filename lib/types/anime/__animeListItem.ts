export interface CoverImage {
    coverImageColor: string;
    coverImage: string;
    bannerImage: string;
  }
  
  export interface Anime {
    id: number;
    title: string;
    episodes: number;
    status: string;
    coverImage: CoverImage;
    format: string;
    popularity: number;
    averageScore: number;
    trending: number;
    releaseDate: string | number;
  }
  