import { api_client } from "./api_client";
import type { IApiSuccessEnvelope, IStreamMetadata, IEpisodeExtra } from "../types";
import { StreamMetadataEnvelopeSchema, EpisodeExtraEnvelopeSchema } from "./schemas";

export const get_stream_metadata = async (id: number) => {
  if (!id || isNaN(id)) {
    throw new Error("Invalid anime ID provided");
  }
  const response = await api_client.get<any, IApiSuccessEnvelope<IStreamMetadata>>(
    `/anime/${id}/stream`
  );
  return StreamMetadataEnvelopeSchema.parse(response);
};

export const get_stream_details = async (id: number, ep: number) => {
  if (!id || isNaN(id) || !ep || isNaN(ep)) {
    throw new Error("Invalid anime ID or episode number provided");
  }
  const response = await api_client.get<any, IApiSuccessEnvelope<IEpisodeExtra>>(
    `/anime/${id}/stream/ep/${ep}/extra`
  );
  return EpisodeExtraEnvelopeSchema.parse(response);
};

export const get_episode_extra = async (id: number, ep: number) => {
  if (!id || isNaN(id) || !ep || isNaN(ep)) {
    throw new Error("Invalid anime ID or episode number provided");
  }
  const response = await api_client.get<any, IApiSuccessEnvelope<IEpisodeExtra>>(
    `/anime/${id}/stream/ep/${ep}/extra`
  );
  return EpisodeExtraEnvelopeSchema.parse(response);
};
