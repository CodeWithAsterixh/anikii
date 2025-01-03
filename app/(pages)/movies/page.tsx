"use client";

import { AnimeGridSkeleton } from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import Pagination from "@/ui/components/pagination/Pagination";
import usePopular from "@/ui/hooks/usePopularHook";
import PopularSection from "@/ui/sections/popularSection/PopularSection";
import { Suspense } from "react";

type Props = object;

export default function Popular({}: Props) {
  const { response } = usePopular();

  return (
    <div className="w-full h-fit">
      <Suspense
        fallback={
          <AnimeGrouper
            header={{
              loading: "Loading popular this season",
            }}
          >
            <AnimeGridSkeleton />
          </AnimeGrouper>
        }
      >
        <PopularSection />
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
