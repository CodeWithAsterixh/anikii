import { useParams } from "react-router";
import { useState, useEffect, useMemo } from "react";
import { MainLayout } from "../layouts/main_layout";
import { VideoPlayer } from "../components/video_player/video_player";
import { SectionTitle } from "../components/section_title/section_title";
import { EpisodeList } from "../components/episode_list/episode_list";
import { use_stream } from "../hooks/use_stream";
import { Download, Info, Globe, Layers, Server } from "lucide-react";
import { ErrorView } from "../components/status_views/error_view";

export default function WatchPage() {
  const { id, ep } = useParams();
  const anime_id = Number(id);
  const episode_num = Number(ep);
  
  const { 
    episode_extra, 
    get_proxied_download_url, 
    get_direct_download_url, 
    get_live_stream_url 
  } = use_stream(anime_id, episode_num);
  
  const [stream_type, setStreamType] = useState<"sub" | "dub">("sub");
  const [stream_url, setStreamUrl] = useState<string>("");
  const [selected_source_name, setSelectedSourceName] = useState<string>("");

  const extra_data = episode_extra.data?.data;
  const sub_links = extra_data?.episodesSub?.stream_links || [];
  const dub_links = extra_data?.episodesDub?.stream_links || [];
  const has_dub = Array.isArray(dub_links) && dub_links.length > 0;

  const current_links = useMemo(() => {
    const base_links = stream_type === "sub" ? sub_links : dub_links;
    
    // Add Anikii's own proxied and live streams to the server list
    const extended_links = [...base_links];
    
    extended_links.push({
      name: "Anikii Direct",
      url: get_direct_download_url(stream_type)
    });
    
    extended_links.push({
      name: "Anikii Live",
      url: get_live_stream_url(stream_type)
    });

    return extended_links;
  }, [stream_type, sub_links, dub_links, get_direct_download_url, get_live_stream_url]);

  const download_link = stream_type === "sub" 
    ? extra_data?.episodesSub?.download_link 
    : extra_data?.episodesDub?.download_link;

  const proxied_download_link = get_proxied_download_url(stream_type);
  const direct_download_link = get_direct_download_url(stream_type);

  // Auto-select primary link when data loads or type changes
  useEffect(() => {
    if (Array.isArray(current_links) && current_links.length > 0) {
      const primary = current_links.find((l: any) => 
        l.name?.toLowerCase() === "gogocdn" || 
        l.name?.toLowerCase() === "vidstreaming"
      ) || current_links[0];
      
      setStreamUrl(primary.url || "");
      setSelectedSourceName(primary.name || "");
    } else {
      setStreamUrl("");
      setSelectedSourceName("");
    }
  }, [current_links]);

  if (episode_extra.is_loading) {
    return (
      <MainLayout>
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="animate-pulse aspect-video bg-base-200 rounded-box" />
          <div className="h-12 w-1/3 bg-base-200 rounded-md animate-pulse" />
        </div>
      </MainLayout>
    );
  }

  if (episode_extra.is_error) {
    return (
      <MainLayout>
        <ErrorView 
          message="Unable to load the video player. This might be due to a temporary server issue." 
          onRetry={episode_extra.retry}
          className="my-20"
        />
      </MainLayout>
    );
  }

  const anime_info = extra_data?.animeInfo;
  const last_episode = anime_info?.episodes?.lastEpisode || 0;

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <VideoPlayer src={stream_url} />
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-2 bg-base-200/50 p-1 rounded-full border border-base-300/20">
            <button 
              onClick={() => setStreamType("sub")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${stream_type === "sub" ? "bg-primary text-primary-content shadow-lg" : "hover:bg-base-300"}`}
            >
              SUB
            </button>
            {has_dub && (
              <button 
                onClick={() => setStreamType("dub")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${stream_type === "dub" ? "bg-primary text-primary-content shadow-lg" : "hover:bg-base-300"}`}
              >
                DUB
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {current_links.map((link: any) => (
              <button
                key={link.name}
                onClick={() => {
                  setStreamUrl(link.url);
                  setSelectedSourceName(link.name);
                }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border transition-all
                  ${selected_source_name === link.name 
                    ? "bg-primary/10 border-primary text-primary" 
                    : "bg-base-200 border-base-300/10 hover:border-base-300"}
                `}
              >
                <Server size={14} />
                <span>{link.name?.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        {!stream_url && !episode_extra.is_loading && (
          <div className="bg-warning/10 text-warning p-4 rounded-box flex items-center gap-3 mb-6 border border-warning/20">
            <Info size={20} />
            <p className="text-sm font-semibold">No streaming links available for this version yet.</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
          <div className="flex-grow">
            <h1 className="text-2xl font-bold mb-2 tracking-tight">
              {anime_info?.title || `Episode ${episode_num}`}
            </h1>
            <div className="flex items-center gap-4 opacity-60 text-sm font-medium">
              <span className="flex items-center gap-1.5">
                <Globe size={14} />
                Episode {episode_num} {last_episode > 0 ? `/ ${last_episode}` : ""}
              </span>
              <span className="flex items-center gap-1.5">
                <Layers size={14} />
                {stream_type.toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <a 
              href={download_link}
              target="_blank"
              rel="noopener noreferrer"
              title="External Download Provider"
              className={`
                flex items-center justify-center gap-2 bg-base-200 hover:bg-base-300 px-6 py-3 rounded-full font-bold transition-all active:scale-95 flex-grow md:flex-grow-0
                ${!download_link ? "opacity-50 pointer-events-none" : ""}
              `}
            >
              <Download size={18} />
              <span className="text-sm">External</span>
            </a>

            <a 
              href={proxied_download_link}
              target="_blank"
              rel="noopener noreferrer"
              title="Download via Anikii Proxy"
              className="flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-full font-bold transition-all active:scale-95 flex-grow md:flex-grow-0 border border-primary/20"
            >
              <Download size={18} />
              <span className="text-sm">Proxied</span>
            </a>

            <a 
              href={direct_download_link}
              target="_blank"
              rel="noopener noreferrer"
              title="Direct Stream Download"
              className="flex items-center justify-center gap-2 bg-secondary/10 hover:bg-secondary/20 text-secondary px-6 py-3 rounded-full font-bold transition-all active:scale-95 flex-grow md:flex-grow-0 border border-secondary/20"
            >
              <Download size={18} />
              <span className="text-sm">Direct</span>
            </a>
          </div>
        </div>

        <section className="bg-base-200/30 p-6 md:p-8 rounded-box border border-base-300/10">
          <SectionTitle title="Episodes" />
          <EpisodeList 
            anime_id={anime_id} 
            total_episodes={last_episode} 
            current_ep={episode_num}
          />
        </section>
      </div>
    </MainLayout>
  );
}
