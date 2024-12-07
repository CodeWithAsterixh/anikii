"use client";

import { getMovies } from "@/lib/mods/middlewares/getMovies";
import { AnimeMovie, process } from "@/lib/types/__anikii_api";
import { updateKeyForExtra } from "@/ui/components/AnimeCard/AnimeCard";
import AnimeGrid, {
  AnimeGridSkeleton,
} from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import React, { useCallback, useEffect, useState } from "react";
interface movies {
  data?: AnimeMovie[];
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
    <AnimeGrouper
      header={
        datas?.data
          ? `${
              datas.data.length > 0
                ? "Anime Movies"
                : "No anime movies available"
            }`
          : "Loading Anime Movies"
      }
    >
      {datas?.data ? (
        <AnimeGrid
          animes={updateKeyForExtra(datas.data, "released", "extra")}
        />
      ) : (
        <AnimeGridSkeleton />
      )}
    </AnimeGrouper>
  );
}
