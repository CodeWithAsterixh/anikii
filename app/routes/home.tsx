import { MainLayout } from "../layouts/main_layout";
import { Carousel } from "../components/carousel/carousel";
import { SectionTitle } from "../components/section_title/section_title";
import { AnimeCard } from "../components/anime_card/anime_card";
import { use_home } from "../hooks/use_home";
import { ErrorView } from "../components/status_views/error_view";
import { EmptyState } from "../components/status_views/empty_state";

export default function Home() {
  const { popular, trending, upcoming } = use_home();

  // If all critical sections fail, show a major error
  const all_failed = popular.is_error && trending.is_error && upcoming.is_error;

  if (all_failed) {
    return (
      <MainLayout>
        <ErrorView 
          message="We're having trouble connecting to the Anikii servers. Please check your connection." 
          onRetry={() => window.location.reload()} 
          className="my-20"
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero / Trending Section */}
      {trending.is_loading ? (
        <div className="h-[400px] w-full bg-base-200 animate-pulse rounded-box mb-10" />
      ) : trending.is_error ? (
        <div className="h-[400px] w-full bg-base-200/50 rounded-box mb-10 flex items-center justify-center p-6">
           <ErrorView message="Failed to load trending anime" onRetry={trending.retry} />
        </div>
      ) : (
        <Carousel anime_list={trending.data?.data || []} />
      )}

      {/* Popular Section */}
      <section className="mb-12">
        <SectionTitle title="Popular Now" subtitle="Most watched anime this week" />
        {popular.is_error ? (
          <ErrorView message="Unable to load popular anime" onRetry={popular.retry} />
        ) : popular.is_empty ? (
          <EmptyState title="No popular anime" message="Check back later for trending titles." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {popular.is_loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-base-200 animate-pulse rounded-box" />
              ))
            ) : (
              (popular.data?.data || []).map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))
            )}
          </div>
        )}
      </section>

      {/* Upcoming Section */}
      <section>
        <SectionTitle title="Upcoming" subtitle="Anticipated releases" />
        {upcoming.is_error ? (
          <ErrorView message="Unable to load upcoming anime" onRetry={upcoming.retry} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {upcoming.is_loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-base-200 animate-pulse rounded-box" />
              ))
            ) : upcoming.is_empty ? (
              <div className="col-span-full py-10 opacity-50 text-center">No upcoming releases found.</div>
            ) : (
              (upcoming.data?.data || []).map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))
            )}
          </div>
        )}
      </section>
    </MainLayout>
  );
}
