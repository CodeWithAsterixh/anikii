import { MainLayout } from "../layouts/main_layout";
import { SearchBar } from "../components/search_bar/search_bar";
import { AnimeCard } from "../components/anime_card/anime_card";
import { SectionTitle } from "../components/section_title/section_title";
import { use_search } from "../hooks/use_search";
import { ErrorView } from "../components/status_views/error_view";
import { EmptyState } from "../components/status_views/empty_state";

export default function SearchPage() {
  const { data, is_loading, is_error, is_empty, retry, perform_search } = use_search();

  return (
    <MainLayout>
      <SearchBar onSearch={perform_search} />

      {is_error && (
        <ErrorView message="Search failed. Please try again." onRetry={retry} className="my-10" />
      )}

      {is_empty && (
        <EmptyState 
          title="No matches found" 
          message="Try different keywords or check for typos." 
          className="my-10"
        />
      )}

      {data && !is_error && !is_empty && (
        <section>
          <SectionTitle 
            title="Search Results" 
            subtitle={`Found ${data.data?.data?.length || 0} results`} 
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {data.data?.data?.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>
      )}

      {is_loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-base-200 animate-pulse rounded-box" />
          ))}
        </div>
      )}

      {!data && !is_loading && !is_error && !is_empty && (
        <div className="text-center py-20 opacity-40">
          <p className="text-xl">Start searching for your favorite anime!</p>
        </div>
      )}
    </MainLayout>
  );
}
