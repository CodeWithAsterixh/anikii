import { useEffect } from "react";
import { use_async } from "./use_async";
import { 
  get_stream_metadata, 
  get_episode_extra,
  get_proxied_download_url,
  get_direct_download_url,
  get_live_stream_url
} from "../helpers/stream_controller";

export function use_stream(id: number, ep?: number) {
  const metadata = use_async(get_stream_metadata);
  const episode_extra = use_async(get_episode_extra);

  useEffect(() => {
    if (id) {
      metadata.execute(id);
    }
  }, [id]);

  useEffect(() => {
    if (id && ep) {
      episode_extra.execute(id, ep);
    }
  }, [id, ep]);

  return {
    metadata,
    episode_extra,
    get_proxied_download_url: (type: "sub" | "dub" = "sub") => 
      ep ? get_proxied_download_url(id, ep, type) : "",
    get_direct_download_url: (type: "sub" | "dub" = "sub", provider?: string) => 
      ep ? get_direct_download_url(id, ep, type, provider) : "",
    get_live_stream_url: (type: "sub" | "dub" = "sub", provider?: string) => 
      ep ? get_live_stream_url(id, ep, type, provider) : "",
  };
}
