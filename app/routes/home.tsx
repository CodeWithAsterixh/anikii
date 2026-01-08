import { useLoaderData } from "react-router";
import { MainLayout } from "../layouts/main_layout";
import { Carousel } from "../components/carousel/carousel";
import { SectionTitle } from "../components/section_title/section_title";
import { AnimeCard } from "../components/anime_card/anime_card";
import { get_popular_anime, get_trending_anime, get_upcoming_anime } from "../helpers/home_controller";
import { AnimeListEnvelopeSchema } from "../helpers/schemas";
import { ErrorView } from "../components/status_views/error_view";
import { SITE_URL } from "../config";
import type { Route } from "./+types/home";
import type { IAnime } from "~/types";
import { EmptyState } from "~/components/status_views/empty_state";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Anikii - Watch Anime Online" },
    { name: "description", content: "Stream your favorite anime in high quality on Anikii. Discover trending, popular, and upcoming anime releases." },
    { property: "og:title", content: "Anikii - Watch Anime Online" },
    { property: "og:description", content: "Stream your favorite anime in high quality on Anikii. Discover trending, popular, and upcoming anime releases." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: SITE_URL },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Anikii - Watch Anime Online" },
    { name: "twitter:description", content: "Stream your favorite anime in high quality on Anikii. Discover trending, popular, and upcoming anime releases." },
    { tagName: "link", rel: "canonical", href: SITE_URL },
  ];
};

export const loader = async () => {
    const empty = [] as IAnime[]

  try {
    const [popularRaw, trendingRaw, upcomingRaw] = await Promise.all([
      get_popular_anime(),
      get_trending_anime(),
      get_upcoming_anime(),
    ]);

    // Validate with Zod for security and type safety
    const popular = AnimeListEnvelopeSchema.parse(popularRaw);
    const trending = AnimeListEnvelopeSchema.parse(trendingRaw);
    const upcoming = AnimeListEnvelopeSchema.parse(upcomingRaw);

    return {
      popular: popular.data || empty ,
      trending: trending.data || empty ,
      upcoming: upcoming.data || empty ,
    };
  } catch (error) {
    console.error("Home loader error:", error);
    return {
      popular:empty,
      trending:empty,
      upcoming:empty,
      error: true
    };
  }
};

export default function Home() {
  const { popular, trending, upcoming, error } = useLoaderData<typeof loader>();

  if (error && popular.length === 0 && trending.length === 0 && upcoming.length === 0) {
    return (
      <MainLayout>
        <ErrorView 
          message="We're having trouble connecting to the Anikii servers. Please check your connection." 
          onRetry={() => globalThis.window.location.reload()} 
          className="my-20"
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero / Trending Section */}
      {trending.length > 0 ? (
<Carousel anime_list={trending as IAnime[]} />
      ) : (
        <div className="h-[400px] w-full bg-base-200/50 rounded-box mb-10 flex items-center justify-center p-6">
           <ErrorView message="Failed to load trending anime" onRetry={() => globalThis.window.location.reload()} />
        </div>
      )}

      {/* Popular Section */}
      <section className="mb-12">
        <SectionTitle title="Popular Now" subtitle="Most watched anime this week" />
        {popular.length === 0 ? (
          <EmptyState title="No popular anime" message="Check back later for trending titles." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {popular.map((anime) => (
              <AnimeCard key={anime.id} anime={anime as IAnime} />
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Section */}
      {/* <section>
        <SectionTitle title="Upcoming" subtitle="Anticipated releases" />
        {upcoming.length === 0 ? (
          <div className="col-span-full py-10 opacity-50 text-center">No upcoming releases found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {upcoming.map((anime) => (
              <AnimeCard key={anime.id} anime={anime as IAnime} />
            ))}
          </div>
        )}
      </section> */}
    </MainLayout>
  );
}
