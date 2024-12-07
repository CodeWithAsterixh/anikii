import { anikiiApi } from "../requests/axios";

export async function getMovies(page?: number) {
  try {
    const response = await anikiiApi(`/movies?page=${page ? page : 1}`);
    return response.data.result;
  } catch (error) {
    throw error;
  }
}
