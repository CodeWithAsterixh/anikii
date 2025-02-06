export interface CoverImage {
  cover_image_color: string;
    cover_image: string;
    bannerImage: string;
  }
  
  export interface AnimeListItem {
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
  