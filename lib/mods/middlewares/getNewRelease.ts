import { anikiiApi } from "../requests/axios";

export async function getNewRelease(page?: number) {
  try {
    const response = await anikiiApi(`/new-season?page=${page ? page : 1}`);
    return response.data.result;
  } catch (error) {
    throw error;
  }
}
