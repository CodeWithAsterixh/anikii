"use client";
import { groupByTitle } from "@/lib/mods/functions/groupAnimeArrayByTitle";
import AnimeCategoryGrouper from "@/ui/components/AnimeList/AnimeCategoryGrouper";
import { AnimeGridSkeleton } from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import AnimeListReloader from "@/ui/components/AnimeList/Reloader";
import useSearch from "@/ui/hooks/useSearchHook";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SearchResultSection() {
  const { fetchSearchResult, response } = useSearch();
  const query = useSearchParams();
  const page = parseInt(query.get("page") || "1");
  const keyword = query.get("for") || "";

  useEffect(() => {
    fetchSearchResult(keyword, page);
  }, [fetchSearchResult, keyword, page]);
  return (
    <AnimeGrouper
      header={{
        error:
          !response.ok && response.status === "error"
            ? "Some error occurred, please reload"
            : undefined,
        loaded:
          response.status === "done"
            ? `Search results for "${keyword}"`
            : undefined,
        loading:
          response.status === "loading"
            ? `Searching for "${keyword}" ...`
            : undefined,
      }}
    >
      {response.ok ? (
        response.data.length > 0 ? (
          <AnimeCategoryGrouper groupedData={groupByTitle(response.data)} />
        ) : (
          <AnimeGridSkeleton />
        )
      ) : (
        <AnimeListReloader
          variant="grid"
          reloader={() => {
            fetchSearchResult(keyword, page);
          }}
        />
      )}
    </AnimeGrouper>
  );
}
