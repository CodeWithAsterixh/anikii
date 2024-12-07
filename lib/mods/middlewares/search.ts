import { anikiiApi } from "../requests/axios";

export interface searchFilters {
  keyWord?: string;
  genre?: string;
  country?: string;
  season?: string;
  year?: string;
  language?: string;
  type?: string;
  status?: string;
  sort?: string;
}
export async function search({
  keyWord,
  country,
  genre,
  language,
  season,
  sort,
  status,
  type,
  year,
}: searchFilters) {
  let url = `/search?for=${keyWord}`;

  if (
    genre ||
    country ||
    season ||
    year ||
    language ||
    type ||
    status ||
    sort
  ) {
    // Append each filter to the URL only if it's provided
    if (genre) {
      url += `&genre=${genre}`; // Assuming genre is an array
    }
    if (country) {
      url += `&country=${country}`;
    }
    if (season) {
      url += `&season=${season}`;
    }
    if (year) {
      url += `&year=${year}`;
    }
    if (language) {
      url += `&language=${language}`;
    }
    if (type) {
      url += `&type=${type}`;
    }
    if (status) {
      url += `&status=${status}`;
    }
    if (sort) {
      url += `&sort=${sort}`;
    }
  }
  try {
    const response = await anikiiApi(url);
    return response.data.result;
  } catch (error) {
    throw error;
  }
}

// search url

export function buildSearchUrl({
  keyWord,
  country,
  genre,
  language,
  season,
  sort,
  status,
  type,
  year,
}: searchFilters): string {
  let url = `/search?for=${encodeURIComponent(keyWord || "")}`;

  if (genre) {
    url += `&genre=${encodeURIComponent(genre)}`;
  }
  if (country) {
    url += `&country=${encodeURIComponent(country)}`;
  }
  if (season) {
    url += `&season=${encodeURIComponent(season)}`;
  }
  if (year) {
    url += `&year=${encodeURIComponent(year)}`;
  }
  if (language) {
    url += `&language=${encodeURIComponent(language)}`;
  }
  if (type) {
    url += `&type=${encodeURIComponent(type)}`;
  }
  if (status) {
    url += `&status=${encodeURIComponent(status)}`;
  }
  if (sort) {
    url += `&sort=${encodeURIComponent(sort)}`;
  }

  return url;
}
