import { Globe, Info, Layers, Server } from "lucide-react";
import { useLoaderData } from "react-router";
import { EpisodeList } from "../components/episode_list/episode_list";
import { SectionTitle } from "../components/section_title/section_title";
import { ErrorView } from "../components/status_views/error_view";
import { VideoPlayer } from "../components/video_player/video_player";
import { get_stream_details } from "../helpers/stream_controller";
import { EpisodeExtraEnvelopeSchema } from "../helpers/schemas";
import { useWatchLinks } from "../hooks/use_watch_links";
import { MainLayout } from "../layouts/main_layout";
import { SITE_URL } from "../config";
import type { Route } from "./+types/watch";

export const meta: Route.MetaFunction = ({ loaderData, params }) => {
  if (!loaderData || loaderData.error) {
    return [{ title: "Episode Not Found | Anikii" }];
  }
  
  const { ep } = params;
  const anime = loaderData.extra_data?.animeInfo;
  const title = anime?.title || `Episode ${ep}`;
  const description = `Watch ${title} online in high quality on Anikii.`;
  const canonical_url = `${SITE_URL}/watch/${params.id}/${ep}`;

  return [
    { title: `Watching ${title} - Episode ${ep} | Anikii` },
    { name: "description", content: description },
    { property: "og:title", content: `Watching ${title} - Episode ${ep} | Anikii` },
    { property: "og:description", content: description },
    { property: "og:type", content: "video.episode" },
    { property: "og:url", content: canonical_url },
    { name: "twitter:card", content: "summary_large_image" },
    { tagName: "link", rel: "canonical", href: canonical_url },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const anime_id = Number(params.id);
  const episode_num = Number(params.ep);
  
  if (Number.isNaN(anime_id) || Number.isNaN(episode_num)) {
    throw new Response("Invalid Parameters", { status: 400 });
  }

  try {
    const stream_data_raw = await get_stream_details(anime_id, episode_num);
    
    // Validate with Zod for security and type safety
    const stream_data = EpisodeExtraEnvelopeSchema.parse(stream_data_raw);
    
    if (!stream_data.data) {
      throw new Response("Stream Data Not Found", { status: 404 });
    }

    return {
      extra_data: stream_data.data,
      anime_id,
      episode_num,
    };
  } catch (error) {
    console.error("Watch loader error:", error);
    if (error instanceof Response) throw error;
    return {
      error: true,
      message: error instanceof Error ? error.message : "An unexpected error occurred"
    };
  }
};

export default function WatchPage() {
  const data = useLoaderData<typeof loader>();

  if (data.error) {
    return (
      <MainLayout>
        <ErrorView 
          message={data.message || "Unable to load the video player. This might be due to a temporary server issue."} 
          onRetry={() => globalThis.window.location.reload()}
          className="my-20"
        />
      </MainLayout>
    );
  }

  const { extra_data, anime_id, episode_num } = data;
  
  const {
    stream_type,
    set_stream_type,
    stream_url,
    set_stream_url,
    selected_source_name,
    set_selected_source_name,
    current_links,
    has_dub,
    has_hsub,
  } = useWatchLinks(extra_data);

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
              onClick={() => set_stream_type("sub")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${stream_type === "sub" ? "bg-primary text-primary-content shadow-lg" : "hover:bg-base-300"}`}
            >
              SUB
            </button>
            {has_hsub && (
              <button 
                onClick={() => set_stream_type("hsub")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${stream_type === "hsub" ? "bg-primary text-primary-content shadow-lg" : "hover:bg-base-300"}`}
              >
                HSUB
              </button>
            )}
            {has_dub && (
              <button 
                onClick={() => set_stream_type("dub")}
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
                  set_stream_url(link.url);
                  set_selected_source_name(link.name);
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

        {!stream_url && (
          <div className="bg-warning/10 text-warning p-4 rounded-box flex items-center gap-3 mb-6 border border-warning/20">
            <Info size={20} />
            <p className="text-sm font-semibold">No streaming links available for this version yet.</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
          <div className="flex-grow">
            <h1 className="text-2xl font-bold mb-2 tracking-tight flex items-center gap-3">
              {`Episode ${episode_num}`}
              {selected_source_name && (
                <span className="badge badge-primary badge-sm font-bold">{selected_source_name}</span>
              )}
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
        </div>

        <section className="bg-base-200/30 p-6 md:p-8 rounded-box border border-base-300/10">
          <SectionTitle title="Episodes" />
          {anime_id&&<EpisodeList 
            anime_id={anime_id} 
            total_episodes={last_episode} 
            current_ep={episode_num}
          />}
        </section>
      </div>
    </MainLayout>
  );
}
