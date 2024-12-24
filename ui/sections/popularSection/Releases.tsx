"use client";
import AnimeGrid, {
  AnimeGridSkeleton,
} from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import AnimeListReloader from "@/ui/components/AnimeList/Reloader";
import { useReleases } from "@/ui/hooks/useSeasons";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ReleasesSection() {
  const { fetchReleases, response } = useReleases();
  const pathName = usePathname();
  const query = useSearchParams();
  const page = parseInt(query.get("page") || "1");

  useEffect(() => {
    fetchReleases(page);
  }, [fetchReleases, page]);
  return (
    <AnimeGrouper
      header={{
        error:
          !response.ok && response.status === "error"
            ? "Some error occurred, please reload"
            : undefined,
        loaded: response.status === "done" ? "New Releases" : undefined,
        loading:
          response.status === "loading" ? "Loading New Releases" : undefined,
      }}
      link={
        pathName !== "/popular/releases"
          ? {
              label: "See all",
              url: "/popular/releases",
            }
          : undefined
      }
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
            fetchReleases();
          }}
        />
      )}
    </AnimeGrouper>
  );
}
