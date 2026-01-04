import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { MainLayout } from "../layouts/main_layout";
import { VideoPlayer } from "../components/video_player/video_player";
import { SectionTitle } from "../components/section_title/section_title";
import { EpisodeList } from "../components/episode_list/episode_list";
import { use_stream } from "../hooks/use_stream";
import { Download } from "lucide-react";

export default function WatchPage() {
  const { id, ep } = useParams();
  const anime_id = Number(id);
  const episode_num = Number(ep);
  
  const { metadata, episode_extra } = use_stream(anime_id, episode_num);
  const [stream_url, setStreamUrl] = useState<string>("");

  useEffect(() => {
    if (episode_extra.data?.data.episodesSub?.stream_links?.length) {
      // Find the first iframe or direct link
      const links = episode_extra.data.data.episodesSub.stream_links;
      const primary_link = links.find((l: any) => l.name === "gogocdn" || l.name === "vidstreaming") || links[0];
      setStreamUrl(primary_link.url);
    }
  }, [episode_extra.data]);

  if (episode_extra.loading) return <MainLayout><div className="animate-pulse aspect-video bg-base-200 rounded-box" /></MainLayout>;

  const anime_info = episode_extra.data?.data.animeInfo;

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <VideoPlayer src={stream_url} />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {anime_info?.title || `Episode ${episode_num}`}
            </h1>
            <p className="opacity-60">
              Episode {episode_num} / {anime_info?.episodes.lastEpisode}
            </p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-base-200 hover:bg-base-300 px-6 py-3 rounded-full font-semibold transition-colors">
              <Download size={20} />
              <span>Download</span>
            </button>
          </div>
        </div>

        <section className="bg-base-200/50 p-6 rounded-box">
          <SectionTitle title="Episodes" />
          <EpisodeList 
            anime_id={anime_id} 
            total_episodes={anime_info?.episodes.lastEpisode || 0} 
            current_ep={episode_num}
          />
        </section>
      </div>
    </MainLayout>
  );
}
