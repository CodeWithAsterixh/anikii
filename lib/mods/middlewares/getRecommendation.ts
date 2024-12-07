import { anikiiApi } from "../requests/axios";

export async function getRecommendation(id: string) {
  try {
    const response = await anikiiApi(`/recommended/${id}`);
    return response.data.result;
  } catch (error) {
    throw error;
  }
}
