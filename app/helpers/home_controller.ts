import { api_client } from "./api_client";
import type { IApiSuccessEnvelope, IPaginatedResponse, IAnime } from "../types";

export const get_popular_anime = async (page = 1) => {
  return api_client.get<any, IApiSuccessEnvelope<IAnime[]>>(
    `/popular?page=${page}`
  );
};

export const get_trending_anime = async (page = 1) => {
  return api_client.get<any, IApiSuccessEnvelope<IAnime[]>>(
    `/popular/releases?page=${page}`
  );
};

export const get_upcoming_anime = async (page = 1) => {
  return api_client.get<any, IApiSuccessEnvelope<IAnime[]>>(
    `/popular/upcoming?page=${page}`
  );
};
