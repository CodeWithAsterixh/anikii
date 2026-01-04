import { api_client } from "./api_client";
import type { IApiSuccessEnvelope, IStreamMetadata, IEpisodeExtra } from "../types";

export const get_stream_metadata = async (id: number) => {
  return api_client.get<any, IApiSuccessEnvelope<IStreamMetadata>>(
    `/anime/${id}/stream`
  );
};

export const get_episode_extra = async (id: number, ep: number) => {
  return api_client.get<any, IApiSuccessEnvelope<IEpisodeExtra>>(
    `/anime/${id}/stream/ep/${ep}/extra`
  );
};
