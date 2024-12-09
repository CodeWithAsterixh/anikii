"use client";

import {
  groupByTitle,
  GroupedResult,
} from "@/lib/mods/functions/groupAnimeArrayByTitle";
import { search, searchFilters } from "@/lib/mods/middlewares/search";
import { process } from "@/lib/types/__anikii_api";
import { updateKeyForExtra } from "@/ui/components/AnimeCard/AnimeCard";
import AnimeCategoryGrouper from "@/ui/components/AnimeList/AnimeCategoryGrouper";
import { Suspense, useCallback, useEffect, useState } from "react";
import AnimeCategSkeleton from "./VideoLoader";
interface popular {
  data: GroupedResult;
  load?: process;
}

export default function SearchResultsSection(filters: searchFilters) {
  const [datas, setDatas] = useState<popular>();

  const loadPopular = useCallback(async () => {
    let timing = 0;
    setDatas({
      data: [],
      load: "loading",
    });
    try {
      const data = await search(filters);
      // const modifiedData = [];
      const modifiedData = updateKeyForExtra(data, "released", "extra"); // modify data to change the released key to extra key
      const groupedData = groupByTitle(modifiedData);
      setDatas({
        data: groupedData,
        load: "done",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (timing < 4) {
        loadPopular();
        timing++;
      } else {
        setDatas({
          data: [],
          load: "error",
        });
      }
    }
  }, [filters]);
  useEffect(() => {
    loadPopular();
  }, [loadPopular]);

  return (
    <Suspense
      fallback={
        <AnimeCategSkeleton
          heading={{
            loading: `Loading search result for "${filters.keyWord}" ...`,
          }}
        />
      }
    >
      <AnimeCategoryGrouper
        loading={datas?.load}
        groupedData={datas?.data}
        keyWord={filters.keyWord}
      />{" "}
    </Suspense>
  );
}
