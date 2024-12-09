"use client";

import { getMovies } from "@/lib/mods/middlewares/getMovies";
import { PagedRouteResult, process } from "@/lib/types/__anikii_api";
import { updateKeyForExtra } from "@/ui/components/AnimeCard/AnimeCard";
import AnimeGrid, {
  AnimeGridSkeleton,
} from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import AnimeCategSkeleton from "./VideoLoader";
interface movies {
  data?: PagedRouteResult;
  load?: process;
}

export default function MoviesSection({ page = 1 }: { page?: number }) {
  const [datas, setDatas] = useState<movies>();

  const loadPopular = useCallback(async () => {
    let timing = 0;
    setDatas((dt) => ({
      ...dt,
      load: "loading",
    }));
    try {
      const data = await getMovies(page);
      setDatas({
        data,
        load: "done",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (timing < 4) {
        loadPopular();
        timing++;
      } else {
        setDatas((dt) => ({
          ...dt,
          load: "error",
        }));
      }
    }
  }, [page]);
  useEffect(() => {
    loadPopular();
  }, [loadPopular]);

  return (
    <Suspense
      fallback={
        <AnimeCategSkeleton heading={{ loading: "Loading movies ..." }} />
      }
    >
      <AnimeGrouper
        header={
          datas?.data
            ? `${
                datas.data.animeItem.length > 0
                  ? "Anime Movies"
                  : "No anime movies available"
              }`
            : "Loading Anime Movies"
        }
      >
        {datas?.data ? (
          <AnimeGrid
            animes={updateKeyForExtra(
              datas.data.animeItem,
              "released",
              "extra"
            )}
          />
        ) : (
          <AnimeGridSkeleton />
        )}
      </AnimeGrouper>
    </Suspense>
  );
}
