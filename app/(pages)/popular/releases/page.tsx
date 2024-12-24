"use client";

import { AnimeGridSkeleton } from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import Pagination from "@/ui/components/pagination/Pagination";
import { useReleases } from "@/ui/hooks/useSeasons";
import ReleasesSection from "@/ui/sections/popularSection/Releases";
import { Suspense } from "react";

type Props = object;

export default function Releases({}: Props) {
  const { response } = useReleases();
  return (
    <div className="w-full h-fit">
      <Suspense
        fallback={
          <AnimeGrouper
            header={{
              loading: "Loading New Releases",
            }}
          >
            <AnimeGridSkeleton />
          </AnimeGrouper>
        }
      >
        <ReleasesSection />
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
