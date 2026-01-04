import { MainLayout } from "../layouts/main_layout";
import { SearchBar } from "../components/search_bar/search_bar";
import { AnimeCard } from "../components/anime_card/anime_card";
import { SectionTitle } from "../components/section_title/section_title";
import { use_search } from "../hooks/use_search";

export default function SearchPage() {
  const { data, loading, perform_search } = use_search();

  return (
    <MainLayout>
      <SearchBar onSearch={perform_search} />

      {data && (
        <section>
          <SectionTitle 
            title="Search Results" 
            subtitle={`Found ${data.data.data.length} results`} 
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {data.data.data.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>
      )}

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-base-200 animate-pulse rounded-box" />
          ))}
        </div>
      )}

      {!data && !loading && (
        <div className="text-center py-20 opacity-40">
          <p className="text-xl">Start searching for your favorite anime!</p>
        </div>
      )}
    </MainLayout>
  );
}
