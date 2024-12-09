"use client";

import { getNewRelease } from "@/lib/mods/middlewares/getNewRelease";
import { PagedRouteResult, process } from "@/lib/types/__anikii_api";
import { updateKeyForExtra } from "@/ui/components/AnimeCard/AnimeCard";
import AnimeGrid, {
  AnimeGridSkeleton,
} from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import { Suspense, useCallback, useEffect, useState } from "react";
import AnimeCategSkeleton from "./VideoLoader";
interface popular {
  data?: PagedRouteResult;
  load?: process;
}

export default function NewRelease({ page = 1 }: { page?: number }) {
  const [datas, setDatas] = useState<popular>();

  const loadNewRelease = useCallback(async () => {
    let timing = 0;
    setDatas((dt) => ({
      ...dt,
      load: "loading",
    }));
    try {
      const data = await getNewRelease(page);
      setDatas({
        data,
        load: "done",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (timing < 4) {
        loadNewRelease();
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
    loadNewRelease();
  }, [loadNewRelease]);
  return (
    <Suspense
      fallback={
        <AnimeCategSkeleton heading={{ loading: "Loading new releases ..." }} />
      }
    >
      <AnimeGrouper
        header={
          datas?.data
            ? `${
                datas.data.animeItem.length > 0
                  ? "New Releases"
                  : "No New Releases available"
              }`
            : "Loading New Releases"
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
