import { mediaFormat } from "../__anikii_api";

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
    format: mediaFormat;
    popularity: number;
    averageScore: number;
    trending: number;
    releaseDate: string | number;
  }
  