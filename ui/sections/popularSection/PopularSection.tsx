"use client";

import { getPopular } from "@/lib/mods/middlewares/getPopulars";
import { PopularList, process } from "@/lib/types/__anikii_api";
import { updateKeyForExtra } from "@/ui/components/AnimeCard/AnimeCard";
import AnimeGrid, {
  AnimeGridSkeleton,
} from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import React, { useCallback, useEffect, useState } from "react";
interface popular {
  data?: PopularList[];
  load?: process;
}

export default function PopularSection({
  page = 1,
  heading = {
    done: "Popular anime",
    loading: "Loading Popular anime",
    notFound: "No Popular anime available",
  },
}: {
  page?: number;
  heading?: {
    done: string;
    loading: string;
    notFound: string;
  };
}) {
  const [datas, setDatas] = useState<popular>();

  const loadPopular = useCallback(async () => {
    let timing = 0;
    setDatas((dt) => ({
      ...dt,
      load: "loading",
    }));
    try {
      const data = await getPopular(page);
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
          ? `${datas.data.length > 0 ? heading.done : heading.notFound}`
          : heading.loading
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
