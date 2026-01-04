import { MainLayout } from "../layouts/main_layout";
import { Carousel } from "../components/carousel/carousel";
import { SectionTitle } from "../components/section_title/section_title";
import { AnimeCard } from "../components/anime_card/anime_card";
import { use_home } from "../hooks/use_home";

export default function Home() {
  const { popular, trending, upcoming } = use_home();

  return (
    <MainLayout>
      {trending.loading ? (
        <div className="h-[400px] w-full bg-base-200 animate-pulse rounded-box mb-10" />
      ) : (
        <Carousel anime_list={trending.data?.data.data || []} />
      )}

      <section className="mb-12">
        <SectionTitle title="Popular Now" subtitle="Most watched anime this week" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {popular.loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-base-200 animate-pulse rounded-box" />
            ))
          ) : (
            popular.data?.data.data.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))
          )}
        </div>
      </section>

      <section>
        <SectionTitle title="Upcoming" subtitle="Anticipated releases" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {upcoming.loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-base-200 animate-pulse rounded-box" />
            ))
          ) : (
            upcoming.data?.data.data.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))
          )}
        </div>
      </section>
    </MainLayout>
  );
}
