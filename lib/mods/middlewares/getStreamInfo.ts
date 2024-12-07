import { anikiiApi } from "../requests/axios";

export async function getStreamInfo(id: string) {
  try {
    const response = await anikiiApi(`/watch/${id}`);
    return response.data.result;
  } catch (error) {
    throw error;
  }
}
