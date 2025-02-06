import { GroupedResult } from "@/lib/mods/functions/groupAnimeArrayByTitle";
import { AnimeListItem } from "@/lib/types/anime/__animeListItem";
import AnimeCard from "@/ui/components/AnimeCard/AnimeCard";
import AnimeGrid from "@/ui/components/AnimeList/AnimeGrid";
import ENDOFLINE from "@/ui/components/ENDOFLINE";
import React from "react";

type Props = {
  data: GroupedResult;
  searchedFor?: string;
  totalLength?: number;
};

export default function SearchResult({ data, searchedFor,totalLength }: Props) {
  if (Array.isArray(data)) {
    return (
      <div className="flex flex-col gap-5 px-2 min-[498px]:px-4">
        <h2 className="text-xl font-bold capitalize">
          Results for {searchedFor}{" "}
          <em className="text-sm text-tertiary opacity-60 not-italic">
            ({totalLength} animes found)
          </em>
        </h2>
        <AnimeGrid>
          {data.map((d: AnimeListItem, i: number) => (
            <AnimeCard key={i} anime={d} />
          ))}
        </AnimeGrid>

      <ENDOFLINE className="mt-16 mb-5"/>

      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-5 px-2 min-[498px]:px-4 pb-16">
      <h2 className="text-xl font-bold capitalize">
        Total results for {searchedFor}{" "}
        <em className="text-sm text-tertiary opacity-60 not-italic">
          ({totalLength} animes found)
        </em>
      </h2>

      {Object.entries(data).map(([key, val], i) => (
        <div key={i} className="flex flex-col gap-3">
          <h2 className="text-xl font-bold capitalize">{key}</h2>
          <AnimeGrid>
            {val.map((d: AnimeListItem, i: number) => (
              <AnimeCard key={i} anime={d} />
            ))}
          </AnimeGrid>
        </div>
      ))}

      <ENDOFLINE className="mt-16 mb-5"/>
    </div>
  );
}
