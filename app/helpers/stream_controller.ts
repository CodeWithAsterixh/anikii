import { api_client } from "./api_client";
import type { IApiSuccessEnvelope, IStreamMetadata, IEpisodeExtra, StreamType } from "../types";

export const get_stream_metadata = async (id: number) => {
  if (!id || isNaN(id)) {
    throw new Error("Invalid anime ID provided");
  }
  return api_client.get<any, IApiSuccessEnvelope<IStreamMetadata>>(
    `/anime/${id}/stream`
  );
};

export const get_episode_extra = async (id: number, ep: number) => {
  if (!id || isNaN(id) || !ep || isNaN(ep)) {
    throw new Error("Invalid anime ID or episode number provided");
  }
  return api_client.get<any, IApiSuccessEnvelope<IEpisodeExtra>>(
    `/anime/${id}/stream/ep/${ep}/extra`
  );
};

export const get_proxied_download_url = (id: number, ep: number, type: StreamType = "sub") => {
  return `${api_client.defaults.baseURL}/anime/${id}/stream/ep/${ep}/download?type=${type}`;
};

export const get_direct_download_url = (id: number, ep: number, type: StreamType = "sub", provider?: string) => {
  let url = `${api_client.defaults.baseURL}/anime/${id}/stream/ep/${ep}/download-direct?type=${type}`;
  if (provider) url += `&provider=${provider}`;
  return url;
};

export const get_live_stream_url = (id: number, ep: number, type: StreamType = "sub", provider?: string) => {
  let url = `${api_client.defaults.baseURL}/anime/${id}/stream/ep/${ep}/live?type=${type}`;
  if (provider) url += `&provider=${provider}`;
  return url;
};
