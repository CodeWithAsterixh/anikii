import { useLoaderData } from "react-router";
import { MainLayout } from "../layouts/main_layout";
import { SectionTitle } from "../components/section_title/section_title";
import { EpisodeList } from "../components/episode_list/episode_list";
import { AnimeCard } from "../components/anime_card/anime_card";
import { get_anime_details, get_recommended_anime } from "../helpers/anime_controller";
import { AnimeDetailsEnvelopeSchema, AnimeListEnvelopeSchema } from "../helpers/schemas";
import { ErrorView } from "../components/status_views/error_view";
import { EmptyState } from "../components/status_views/empty_state";
import { SITE_URL } from "../config";
import type { Route } from "./+types/anime_detail";
import { sanitize_html } from "~/helpers/sanitizer";

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data || data.error || !data.anime) {
    return [{ title: "Anime Not Found | Anikii" }];
  }
  
  const anime = data.anime;
  const title = anime.title?.english || anime.title?.romaji || "Anime Details";
  const description = anime.description?.replace(/<[^>]*>?/gm, '').slice(0, 160) || "Watch " + title + " on Anikii.";
  const image = anime.coverImage?.cover_image;
  const canonical_url = `${SITE_URL}/anime/${anime.id}`;

  return [
    { title: `${title} | Anikii` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | Anikii` },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:url", content: canonical_url },
    { property: "og:type", content: "video.tv_show" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${title} | Anikii` },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { tagName: "link", rel: "canonical", href: canonical_url },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const anime_id = Number(params.id);
  
  if (isNaN(anime_id)) {
    throw new Response("Invalid Anime ID", { status: 400 });
  }

  try {
    const [detailsRaw, recommendedRaw] = await Promise.all([
      get_anime_details(anime_id),
      get_recommended_anime(anime_id),
    ]);

    // Validate with Zod for security and type safety
    const details = AnimeDetailsEnvelopeSchema.parse(detailsRaw);
    const recommended = AnimeListEnvelopeSchema.parse(recommendedRaw);

    if (!details.data) {
      throw new Response("Anime Not Found", { status: 404 });
    }

    return {
      anime: details.data,
      recommended: recommended.data || [],
      anime_id,
    };
  } catch (error) {
    console.error("Anime detail loader error:", error);
    if (error instanceof Response) throw error;
    return {
      error: true,
      message: error instanceof Error ? error.message : "An unexpected error occurred"
    };
  }
};

export default function AnimeDetail() {
  const data = useLoaderData<typeof loader>();

  if (data.error) {
    return (
      <MainLayout>
        <ErrorView 
          message={data.message || "We couldn't find the details for this anime."} 
          onRetry={() => window.location.reload()}
          className="my-20"
        />
      </MainLayout>
    );
  }

  const { anime, recommended, anime_id } = data;

  if (!anime) {
    return (
      <MainLayout>
        <ErrorView 
          message="Anime not found. It may have been removed or the ID is incorrect." 
          onRetry={() => window.location.reload()}
          className="my-20"
        />
      </MainLayout>
    );
  }

  const title = anime.title?.english || anime.title?.romaji || "Unknown Title";

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/4 shrink-0">
          <img 
            src={anime.coverImage?.cover_image || "/placeholder-anime.png"} 
            alt={title} 
            className="w-full max-h-[50vh] object-cover object-center rounded-box shadow-xl border border-base-300/10"
            onError={(e) => (e.currentTarget.src = "/placeholder-anime.png")}
          />
        </div>
        
        <div className="flex-grow">
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
            {title}
          </h1>
          
          {Array.isArray(anime.genres) && anime.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genres.map(genre => (
                <span key={genre} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
                  {genre}
                </span>
              ))}
            </div>
          )}

          <p className="text-base-content/80 leading-relaxed mb-8 max-w-3xl" 
             dangerouslySetInnerHTML={{ __html: sanitize_html(anime.description || "No description available.") }} />
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-base-200">
            <div>
              <p className="text-xs opacity-50 uppercase font-bold tracking-wider mb-1">Status</p>
              <p className="font-semibold">{anime.status || "Unknown"}</p>
            </div>
            <div>
              <p className="text-xs opacity-50 uppercase font-bold tracking-wider mb-1">Format</p>
              <p className="font-semibold">{anime.format || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs opacity-50 uppercase font-bold tracking-wider mb-1">Episodes</p>
              <p className="font-semibold">{anime.episodes || "?"}</p>
            </div>
            <div>
              <p className="text-xs opacity-50 uppercase font-bold tracking-wider mb-1">Season</p>
              <p className="font-semibold">{anime.season?.type || ""} {anime.season?.year || ""}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <SectionTitle title="Episodes" />
        {anime.episodes > 0 ? (
          <EpisodeList anime_id={anime_id} total_episodes={anime.episodes} />
        ) : (
          <EmptyState title="No episodes yet" message="This anime might not have aired yet or episode data is missing." />
        )}
      </section>

      {recommended.length > 0 && (
        <section>
          <SectionTitle title="Recommended For You" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {recommended.map((rec: any) => (
              <AnimeCard key={rec.id} anime={rec} />
            ))}
          </div>
        </section>
      )}
    </MainLayout>
  );
}
