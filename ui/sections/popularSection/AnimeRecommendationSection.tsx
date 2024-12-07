"use client";

import { getRecommendation } from "@/lib/mods/middlewares/getRecommendation";
import { process, Recommended } from "@/lib/types/__anikii_api";
import { updateKeyForExtra } from "@/ui/components/AnimeCard/AnimeCard";
import AnimeGrid, {
  AnimeGridSkeleton,
} from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import { useCallback, useEffect, useState } from "react";
interface popular {
  data?: Recommended[];
  load?: process;
}

export default function AnimeRecommendationSection({ id }: { id: string }) {
  const [datas, setDatas] = useState<popular>();

  const loadRecommendation = useCallback(async () => {
    let timing = 0;
    setDatas((dt) => ({
      ...dt,
      load: "loading",
    }));
    try {
      const data = await getRecommendation(id);
      console.log(data);
      setDatas({
        data,
        load: "done",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (timing < 4) {
        loadRecommendation();
        timing++;
      } else {
        setDatas((dt) => ({
          ...dt,
          load: "error",
        }));
      }
    }
  }, [id]);
  useEffect(() => {
    loadRecommendation();
  }, [loadRecommendation]);

  return (
    <AnimeGrouper
      header={
        datas?.data
          ? `${
              datas.data.length > 0
                ? "Recommended"
                : "No Recommendation available"
            }`
          : "Loading Recommendations"
      }
    >
      {datas?.data ? (
        <AnimeGrid animes={updateKeyForExtra(datas.data, "episode", "extra")} />
      ) : (
        <AnimeGridSkeleton />
      )}
    </AnimeGrouper>
  );
}
