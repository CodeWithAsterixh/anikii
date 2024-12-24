"use client";
import AnimeGrid, {
  AnimeGridSkeleton,
} from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import AnimeList, {
  AnimeListSkeleton,
} from "@/ui/components/AnimeList/AnimeList";
import AnimeListReloader from "@/ui/components/AnimeList/Reloader";
import usePopular from "@/ui/hooks/usePopularHook";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PopularSection() {
  const { fetchPopular, response } = usePopular();
  const query = useSearchParams();
  const page = parseInt(query.get("page") || "1");

  const pathName = usePathname();

  useEffect(() => {
    fetchPopular(page);
  }, [fetchPopular, page]);
  return (
    <AnimeGrouper
      header={{
        error:
          !response.ok && response.status === "error"
            ? "Some error occurred, please reload"
            : undefined,
        loaded: response.status === "done" ? "Popular this season" : undefined,
        loading:
          response.status === "loading"
            ? "Loading popular this season"
            : undefined,
      }}
      link={
        pathName !== "/popular"
          ? {
              label: "See all",
              url: "/popular",
            }
          : undefined
      }
    >
      {pathName !== "/popular" ? (
        response.ok ? (
          response.data.length > 0 ? (
            <AnimeList animes={response.data} />
          ) : (
            <AnimeListSkeleton />
          )
        ) : (
          <AnimeListReloader
            variant="scroll"
            reloader={() => {
              fetchPopular();
            }}
          />
        )
      ) : response.ok ? (
        response.data.length > 0 ? (
          <AnimeGrid animes={response.data} />
        ) : (
          <AnimeGridSkeleton />
        )
      ) : (
        <AnimeListReloader
          variant="grid"
          reloader={() => {
            fetchPopular();
          }}
        />
      )}
    </AnimeGrouper>
  );
}
