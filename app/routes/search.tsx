import { useLoaderData, useNavigation, useSearchParams } from "react-router";
import { MainLayout } from "../layouts/main_layout";
import { SearchBar } from "../components/search_bar/search_bar";
import { AnimeCard } from "../components/anime_card/anime_card";
import { SectionTitle } from "../components/section_title/section_title";
import { search_anime } from "../helpers/search_controller";
import { AnimeListEnvelopeSchema } from "../helpers/schemas";
import { ErrorView } from "../components/status_views/error_view";
import { EmptyState } from "../components/status_views/empty_state";
import type { IAnime } from "~/types";
import type { Route } from "./+types/search";

export const meta: Route.MetaFunction = ({ location }) => {
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");
  const title = query ? `Search results for "${query}" | Anikii` : "Search Anime | Anikii";
  const canonical_url = "https://anikii.com/search";
  
  return [
    { title },
    { name: "description", content: query ? `Discover anime related to "${query}" on Anikii.` : "Search through thousands of anime titles on Anikii." },
    { property: "og:title", content: title },
    { property: "og:url", content: query ? `${canonical_url}?q=${encodeURIComponent(query)}` : canonical_url },
    { name: "robots", content: query ? "noindex, follow" : "index, follow" },
    { tagName: "link", rel: "canonical", href: canonical_url },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query) {
    return { results: [] as IAnime[], query: "", has_searched: false };
  }

  try {
    const response_raw = await search_anime(query);
    
    // Validate with Zod for security and type safety
    const response = AnimeListEnvelopeSchema.parse(response_raw);

    return {
      results: (response.data || []) as IAnime[],
      query,
      has_searched: true
    };
  } catch (error) {
    console.error("Search loader error:", error);
    return {
      results: [] as IAnime[],
      query,
      has_searched: true,
      error: true
    };
  }
};

export default function SearchPage() {
  const { results, query, has_searched, error } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const is_loading = navigation.state === "loading" && navigation.location.pathname === "/search";

  const perform_search = (q: string) => {
    setSearchParams({ q });
  };

  return (
    <MainLayout>
      <SearchBar onSearch={perform_search} initialValue={query} />

      {error && (
        <ErrorView message="Search failed. Please try again." onRetry={() => window.location.reload()} className="my-10" />
      )}

      {has_searched && !error && results.length === 0 && !is_loading && (
        <EmptyState 
          title="No matches found" 
          message="Try different keywords or check for typos." 
          className="my-10"
        />
      )}

      {results.length > 0 && !error && (
        <section className={is_loading ? "opacity-50 transition-opacity" : ""}>
          <SectionTitle 
            title="Search Results" 
            subtitle={`Found ${results.length} results for "${query}"`} 
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {results.map((anime: IAnime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>
      )}

      {is_loading && results.length === 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-base-200 animate-pulse rounded-box" />
          ))}
        </div>
      )}

      {!has_searched && !is_loading && !error && (
        <div className="text-center py-20 opacity-40">
          <p className="text-xl">Start searching for your favorite anime!</p>
        </div>
      )}
    </MainLayout>
  );
}
