"use client";

import { AnimeGridSkeleton } from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import { AnimeListSkeleton } from "@/ui/components/AnimeList/AnimeList";
import PopularCarousel from "@/ui/sections/popularCarousel/PopularCarousel";
import PopularSection from "@/ui/sections/popularSection/PopularSection";
import ReleasesSection from "@/ui/sections/popularSection/Releases";
import { Suspense } from "react";

type Props = object;

export default function Home({}: Props) {
  return (
    <div className="w-full h-fit">
      <PopularCarousel />
      
      <Suspense
        fallback={
                <AnimeGrouper
                  header={{
                    loading: "Loading popular this season",
                  }}
                >
                  <AnimeListSkeleton />
                </AnimeGrouper>
              }
      >
        <PopularSection />
      </Suspense>
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
    </div>
  );
}
