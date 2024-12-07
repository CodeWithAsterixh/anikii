import { anikiiApi } from "../requests/axios";

export async function getPopular(page?: number) {
  try {
    const response = await anikiiApi(`/popular?page=${page ? page : 1}`);
    return response.data.result;
  } catch (error) {
    throw error;
  }
}
