import { pagesLeft } from "../helpers/parsers/pagesLeft";

export interface AnimeDetails {
  title: string; // Title of the anime
  episode: string; // Current episode number or details
  description: string; // Synopsis of the anime
  videoUrl: string; // URL of the iframe video source
  image: string; // Thumbnail or poster image URL
  releaseDate: string; // Release date of the current episode
  episodes: Episode[]; // List of all episodes
}
export interface Episode {
  title: string; // Episode title
  url: string; // URL to watch the episode
  imageUrl: string; // Thumbnail image for the episode
  releaseDate: string; // Release date of the episode
}

export interface StreamLink {
  [key: string]: string;
}
export interface StreamInfo {
  streamLink?: StreamLink[];
  episodeInfo: {
    title: string;
  };
  animeInfo: {
    title: string;
    category?: string;
  };
  downloadSrc?: string;
}

export interface DownloadLinks {
  direct: Record<string, string>[];
  mirror: Record<string, string>[];
}

export interface AnimeItem {
  title: string;
  id: string;
  image: string;
  released?: string;
}

export interface PagedRouteResult {
  animeItem: AnimeItem[];
  pages: pagesLeft;
}

export interface filterOptions {
  keyword: string;
  genre: string[];
  country: "China" | "Japan";
  season: "fall|summer|spring|winter";
  year:
    | 2024
    | 2023
    | 2022
    | 2021
    | 2020
    | 2019
    | 2018
    | 2017
    | 2016
    | 2015
    | 2014
    | 2013
    | 2012
    | 2011
    | 2010
    | 2009
    | 2008
    | 2007
    | 2006
    | 2005
    | 2004
    | 2003
    | 2002
    | 2001
    | 2000
    | 1999; // List of years
  language: "subdub" | "sub" | "dub";
  type: "Movie" | "TV" | "OVA" | "ONA" | "Special" | "Music";
  status: "Upcoming" | "Ongoing" | "Completed";
  sort: "title_az" | "recently_updated" | "recently_added" | "release_date";
}

export type process = "loading" | "done" | "error";
