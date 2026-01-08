import { useMemo, useState, useEffect } from "react";
import type { StreamType } from "../types";

interface StreamLink {
  name: string;
  url: string;
}


export function useWatchLinks(extra_data: any) {
  const [streamType, setStreamType] = useState<StreamType>("sub");
  const [streamUrl, setStreamUrl] = useState<string>("");
  const [selectedSourceName, setSelectedSourceName] = useState<string>("");

  const sub_data = extra_data?.episodesSub;
  const dub_data = extra_data?.episodesDub;

  const sub_links = sub_data?.stream_links || [];
  const dub_links = dub_data?.stream_links || [];
  const hsub_links = sub_data?.links_hsub || [];

  const has_dub = (Array.isArray(dub_links) && dub_links.length > 0) || (dub_data?.links_dub?.length > 0);
  const has_hsub = Array.isArray(hsub_links) && hsub_links.length > 0;

  const current_links = useMemo(() => {
    let base_links: StreamLink[] = [];
    if (streamType === "sub") base_links = sub_links;
    else if (streamType === "dub") base_links = (dub_data)?.links_dub || dub_links;
    else if (streamType === "hsub") base_links = hsub_links;
    
    const filtered_map = new Map<string, StreamLink>();
    
    if (Array.isArray(base_links)) {
      base_links.forEach((link: any) => {
        const name = link.name?.toUpperCase();
        if ((name === "HD-1" || name === "HD-2") && !filtered_map.has(name)) {
          // Validate URL
          try {
            const url = new URL(link.url);
            if (url.protocol === "http:" || url.protocol === "https:") {
              filtered_map.set(name, { name: link.name, url: link.url });
            }
          } catch {
            // Ignore invalid URLs
          }
        }
      });
    }

    return Array.from(filtered_map.values());
  }, [streamType, sub_links, dub_links, hsub_links, dub_data]);

  useEffect(() => {
    if (current_links.length > 0) {
      const primary = 
        current_links.find((l) => l.name?.toUpperCase() === "HD-1") ||
        current_links.find((l) => l.name?.toUpperCase() === "HD-2") ||
        current_links[0];
      
      setStreamUrl(primary.url || "");
      setSelectedSourceName(primary.name || "");
    } else {
      setStreamUrl("");
      setSelectedSourceName("");
    }
  }, [current_links]);

  return {
    stream_type: streamType,
    set_stream_type: setStreamType,
    stream_url: streamUrl,
    set_stream_url: setStreamUrl,
    selected_source_name: selectedSourceName,
    set_selected_source_name: setSelectedSourceName,
    current_links,
    has_dub,
    has_hsub,
  };
}
