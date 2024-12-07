// Define the structure for the Anime Details data
export interface AnimeDetails {
  title: string;
  image: string | undefined;
  type: string;
  summary: string;
  released: string;
  genres: string;
  status: string;
  totalEpisodes: string;
  otherName: string;
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

export interface Recommended {
  title: string;
  id: string;
  image: string;
  episode: string;
}
export interface DownloadLinks {
  direct: Record<string, string>[];
  mirror: Record<string, string>[];
}

export interface PopularList {
  title: string;
  id: string;
  image: string;
  released: string;
}

export type AnimeMovie = PopularList;
export type NewSeason = PopularList;
export type GenreResult = PopularList;
export type SearchResult = PopularList;

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
