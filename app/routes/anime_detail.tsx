import { useParams } from "react-router";
import { MainLayout } from "../layouts/main_layout";
import { SectionTitle } from "../components/section_title/section_title";
import { EpisodeList } from "../components/episode_list/episode_list";
import { AnimeCard } from "../components/anime_card/anime_card";
import { use_anime } from "../hooks/use_anime";
import { ErrorView } from "../components/status_views/error_view";
import { EmptyState } from "../components/status_views/empty_state";
import { sanitize_html } from "../helpers/sanitizer";

export default function AnimeDetail() {
  const { id } = useParams();
  const anime_id = Number(id);
  const { details, recommended } = use_anime(anime_id);

  if (details.is_loading) {
    return (
      <MainLayout>
        <div className="flex flex-col md:flex-row gap-8 mb-12 animate-pulse">
          <div className="w-full md:w-1/4 aspect-[3/4] bg-base-200 rounded-box" />
          <div className="flex-grow space-y-4">
            <div className="h-12 bg-base-200 w-3/4 rounded-md" />
            <div className="h-4 bg-base-200 w-1/4 rounded-md" />
            <div className="h-32 bg-base-200 w-full rounded-md" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (details.is_error || !details.data?.data) {
    return (
      <MainLayout>
        <ErrorView 
          message={details.error?.message || "We couldn't find the details for this anime."} 
          onRetry={details.retry}
          className="my-20"
        />
      </MainLayout>
    );
  }

  const anime = details.data.data;
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

      {recommended.data?.data && (recommended.data.data || []).length > 0 && (
        <section>
          <SectionTitle title="Recommended For You" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {(recommended.data.data || []).map((rec: any) => (
              <AnimeCard key={rec.id} anime={rec} />
            ))}
          </div>
        </section>
      )}
    </MainLayout>
  );
}
