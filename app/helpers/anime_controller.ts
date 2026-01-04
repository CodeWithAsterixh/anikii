import { api_client } from "./api_client";
import type { IApiSuccessEnvelope, IAnimeDetails, IPaginatedResponse, IAnime } from "../types";

export const get_anime_details = async (id: number) => {
  return api_client.get<any, IApiSuccessEnvelope<IAnimeDetails>>(
    `/anime/${id}`
  );
};

export const get_recommended_anime = async (id: number, page = 1) => {
  return api_client.get<any, IApiSuccessEnvelope<IPaginatedResponse<IAnime>>>(
    `/anime/${id}/recommended?page=${page}`
  );
};
