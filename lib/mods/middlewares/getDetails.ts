import { anikiiApi } from "../requests/axios";

export async function getDetails(id: string) {
  try {
    const response = await anikiiApi(`/details/${id}`);
    return response.data.result;
  } catch (error) {
    throw error;
  }
}
