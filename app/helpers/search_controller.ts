import { api_client } from "./api_client";
import type { IApiSuccessEnvelope, IPaginatedResponse, IAnime } from "../types";

export const search_anime = async (keyword: string, page = 1) => {
  if (!keyword || typeof keyword !== 'string' || keyword.trim() === '') {
    // Return empty paginated response instead of throwing to allow UI to handle "no search" state gracefully
    return {
      status: { success: true, message: "No search keyword provided" },
      data: {
        data: [],
        meta: { current_page: page, last_page: 1, per_page: 20, total: 0 }
      }
    } as any;
  }
  
  return api_client.get<any, IApiSuccessEnvelope<IPaginatedResponse<IAnime>>>(
    `/search?keyword=${encodeURIComponent(keyword)}&page=${page}`
  );
};
