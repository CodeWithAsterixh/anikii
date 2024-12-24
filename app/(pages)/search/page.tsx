"use client";

import { AnimeGridSkeleton } from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import Pagination from "@/ui/components/pagination/Pagination";
import useSearch from "@/ui/hooks/useSearchHook";
import SearchResultSection from "@/ui/sections/searchSection/SearchResultSection";
import { Suspense } from "react";

type Props = object;

export default function Season({}: Props) {
  const { response } = useSearch();
  return (
    <div className="w-full h-fit">
      <Suspense
              fallback={
                <AnimeGrouper
                  header={{
                    loading: "Loading ...",
                  }}
                >
                  <AnimeGridSkeleton />
                </AnimeGrouper>
              }
            >
              <SearchResultSection />
            </Suspense>
      <Pagination
        page={
          response.pageInfo
            ? response.pageInfo
            : {
                currentPage: 0,
                lastPage: 0,
              }
        }
      />
    </div>
  );
}
