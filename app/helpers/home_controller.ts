import { api_client } from "./api_client";
import type { IApiSuccessEnvelope, IAnime } from "../types";
import { AnimeListEnvelopeSchema } from "./schemas";

export const get_popular_anime = async (page = 1) => {
  const response = await api_client.get<any, IApiSuccessEnvelope<IAnime[]>>(
    `/popular?page=${page}`
  );
  return AnimeListEnvelopeSchema.parse(response);
};

export const get_trending_anime = async (page = 1) => {
  const response = await api_client.get<any, IApiSuccessEnvelope<IAnime[]>>(
    `/popular/releases?page=${page}`
  );
  return AnimeListEnvelopeSchema.parse(response);
};

export const get_upcoming_anime = async (page = 1) => {
  const response = await api_client.get<any, IApiSuccessEnvelope<IAnime[]>>(
    `/popular/upcoming?page=${page}`
  );
  return AnimeListEnvelopeSchema.parse(response);
};
