import { api_client } from "./api_client";
import type { IApiSuccessEnvelope, IPaginatedResponse, IAnime } from "../types";

export const search_anime = async (keyword: string, page = 1) => {
  return api_client.get<any, IApiSuccessEnvelope<IPaginatedResponse<IAnime>>>(
    `/search?keyword=${encodeURIComponent(keyword)}&page=${page}`
  );
};
