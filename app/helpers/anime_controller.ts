import { api_client } from "./api_client";
import type { IApiSuccessEnvelope, IAnimeDetails, IAnime } from "../types";
import { AnimeDetailsEnvelopeSchema, AnimeListEnvelopeSchema } from "./schemas";

export const get_anime_details = async (id: number) => {
  if (!id || isNaN(id)) {
    throw new Error("Invalid anime ID provided");
  }
  const response = await api_client.get<any, IApiSuccessEnvelope<IAnimeDetails>>(
    `/anime/${id}`
  );
  return AnimeDetailsEnvelopeSchema.parse(response);
};

export const get_recommended_anime = async (id: number, page = 1) => {
  if (!id || isNaN(id)) {
    throw new Error("Invalid anime ID provided");
  }
  const response = await api_client.get<any, IApiSuccessEnvelope<IAnime[]>>(
    `/anime/${id}/recommended?page=${page}`
  );
  return AnimeListEnvelopeSchema.parse(response);
};
