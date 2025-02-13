"use client";

import useQuery from "@/hooks/useQuery";
import { AnimeData } from "@/lib/types/anime/__animeDetails";
import { Card } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type Props = object;

export default function Category({}: Props) {
  const { id } = useParams<{ id: string }>();
  const watchRes = useQuery<AnimeData>(`/anime/${id}/stream`);

  return (
    <div className="w-full h-fit flex flex-col gap-4">
      <div className="w-full flex items-center p-2 justify-between sticky top-36 bg-accent py-1 shadow-md">
        <h3 className="font-bold text-lg">Watch anime</h3>
        <span className="font-bold">Episodes <i className="not-italic font-normal text-tertiary/60">{watchRes.data?.episodes}</i></span>
      </div>
      <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))]">
        {
          watchRes.data?.streamingEpisodes&&watchRes.data?.streamingEpisodes.map((ep,ind)=>(
            <Card key={ind}>
              <span className="w-full h-48">
              </span>
            </Card>
          ))
        }
      </div>
    </div>
  );
}
