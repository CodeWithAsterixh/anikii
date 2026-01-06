import { api_client } from "./api_client";
import type { IApiSuccessEnvelope, IAnime } from "../types";
import { AnimeListEnvelopeSchema } from "./schemas";

export const search_anime = async (keyword: string, page = 1) => {
  if (!keyword || typeof keyword !== 'string' || keyword.trim() === '') {
    // Return empty array in data to match backend pattern
    return {
      status: { success: true, message: "No search keyword provided", code: 200 },
      data: []
    } as any;
  }
  
  const response = await api_client.get<any, IApiSuccessEnvelope<IAnime[]>>(
    `/search?keyword=${encodeURIComponent(keyword)}&page=${page}`
  );
  return AnimeListEnvelopeSchema.parse(response);
};
