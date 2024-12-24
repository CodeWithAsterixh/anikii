"use client";
import { seasons } from "@/lib/types/__anikii_api";
import AnimeGrid, {
  AnimeGridSkeleton,
} from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import AnimeListReloader from "@/ui/components/AnimeList/Reloader";
import useSeasons from "@/ui/hooks/useSeasons";
import { useEffect } from "react";

export default function SeasonalSection({
  season,
  year,
}: {
  season?: seasons;
  year?: number;
}) {
  const { fetchSeason, response } = useSeasons(season, year);

  useEffect(() => {
    if (response.status === "not initiated") {
      fetchSeason();
    }
  }, [fetchSeason, response.status]);
  return (
    <AnimeGrouper
      header={{
        error:
          !response.ok && response.status === "error"
            ? "Some error occurred, please reload"
            : undefined,
        loaded:
          response.status === "done"
            ? `Animes of ${season ? season : "this season"} ${year ? year : ""}`
            : undefined,
        loading:
          response.status === "loading"
            ? `Loading animes of ${season ? season : "this season"} ${
                year ? year : ""
              }`
            : undefined,
      }}
    >
      {response.ok ? (
        response.data.length > 0 ? (
          <AnimeGrid animes={response.data} />
        ) : (
          <AnimeGridSkeleton />
        )
      ) : (
        <AnimeListReloader
          variant="grid"
          reloader={() => {
            fetchSeason();
          }}
        />
      )}
    </AnimeGrouper>
  );
}
