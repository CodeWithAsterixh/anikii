import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { MainLayout } from "../layouts/main_layout";
import { VideoPlayer } from "../components/video_player/video_player";
import { SectionTitle } from "../components/section_title/section_title";
import { EpisodeList } from "../components/episode_list/episode_list";
import { use_stream } from "../hooks/use_stream";
import { Download, Info } from "lucide-react";
import { ErrorView } from "../components/status_views/error_view";

export default function WatchPage() {
  const { id, ep } = useParams();
  const anime_id = Number(id);
  const episode_num = Number(ep);
  
  const { episode_extra } = use_stream(anime_id, episode_num);
  const [stream_url, setStreamUrl] = useState<string>("");

  useEffect(() => {
    const stream_links = episode_extra.data?.data?.episodesSub?.stream_links;
    if (Array.isArray(stream_links) && stream_links.length > 0) {
      // Find the first iframe or direct link
      const primary_link = stream_links.find((l: any) => 
        l.name?.toLowerCase() === "gogocdn" || 
        l.name?.toLowerCase() === "vidstreaming"
      ) || stream_links[0];
      
      setStreamUrl(primary_link.url || "");
    } else {
      setStreamUrl("");
    }
  }, [episode_extra.data]);

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

  const anime_info = episode_extra.data?.data?.animeInfo;
  const last_episode = anime_info?.episodes?.lastEpisode || 0;

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <VideoPlayer src={stream_url} />
        </div>

        {!stream_url && !episode_extra.is_loading && (
          <div className="bg-warning/10 text-warning p-4 rounded-box flex items-center gap-3 mb-6 border border-warning/20">
            <Info size={20} />
            <p className="text-sm font-semibold">No streaming links available for this episode yet.</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
          <div>
            <h1 className="text-2xl font-bold mb-2 tracking-tight">
              {anime_info?.title || `Episode ${episode_num}`}
            </h1>
            <p className="opacity-60 font-medium">
              Episode {episode_num} {last_episode > 0 ? `/ ${last_episode}` : ""}
            </p>
          </div>
          
          <div className="flex gap-3">
            <button 
              disabled={!stream_url}
              className="flex items-center gap-2 bg-base-200 hover:bg-base-300 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-full font-semibold transition-all active:scale-95"
            >
              <Download size={20} />
              <span>Download</span>
            </button>
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
