"use client";
import useQuery from "@/hooks/useQuery";
import {
    groupByTitle,
    GroupedResult,
} from "@/lib/mods/functions/groupAnimeArrayByTitle";
import { AnimeListItem } from "@/lib/types/anime/__animeListItem";
import Loader from "@/ui/components/Loader/Loader";
import SearchResult from "@/ui/sections/searchResult/searchResult";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function SearchPae() {
  const params = useSearchParams();
  const keyWord = params.get("for");

  const searchResult = useQuery<AnimeListItem[]>(`/search?for=${keyWord}`);
  const [data, setData] = useState<GroupedResult>();

  useEffect(() => {
    if (searchResult.data) {
      const newData = groupByTitle(searchResult.data);
      setData(newData);
    }
  }, [searchResult.data]);

  const loader = (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-4">
      <Loader />
      <strong className="animate-pulse text-tertiary opacity-50">
        Loading {keyWord}...
      </strong>
    </div>
  );

  return (
    <div className="w-full text-tertiary flex flex-col gap-3 pt-2">
      <Suspense fallback={loader}>
        {data ? (
          <SearchResult
            data={data}
            searchedFor={keyWord ?? "undefined"}
            totalLength={searchResult.data?.length}
          />
        ) : (
          loader
        )}
      </Suspense>
    </div>
  );
}
