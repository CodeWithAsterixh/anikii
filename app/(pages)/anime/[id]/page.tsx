"use client";

import AnimeDetailsTabs from "@/ui/components/AnimeCard/AnimeDetailsTabs";
import AnimeInfoCard from "@/ui/components/AnimeCard/AnimeInfoCard";
import AnimeInfoStream from "@/ui/components/AnimeCard/AnimeInfoStream";
import AnimeInfoStreamLoader from "@/ui/components/AnimeCard/AnimeInfoStreamSkeleton";
import AnimeListReloader from "@/ui/components/AnimeList/Reloader";
import useAnimeInfos from "@/ui/hooks/useAnimeInfos";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = object;

export default function Genres_GENRE({}: Props) {
  const { response, fetchInfo, fetchInfoStream, responseStream } =
    useAnimeInfos();
  const { id } = useParams();
  const [idNum, setIdNum] = useState<number>();

  useEffect(() => {
    if (typeof id === "string") {
      const idNum = parseInt(id);
      if (!isNaN(idNum)) {
        setIdNum(idNum);
        fetchInfo(idNum);
        fetchInfoStream(idNum);
      }
    }
  }, [fetchInfo, fetchInfoStream, id]);


  return (
    <div className="w-full h-fit pb-10 px-2">
      <AnimeInfoCard
        anime={response.data}
        status={response.status}
        reloader={
          <AnimeListReloader
            reloader={() => {
              if (idNum) {
                fetchInfo(idNum);
              }
            }}
          />
        }
      />
      <AnimeDetailsTabs
        casts={<>casts</>}
        stream={
          responseStream.status === "done" ? (
            responseStream.data && <AnimeInfoStream {...responseStream.data} />
          ) : (
            <AnimeInfoStreamLoader
              reloader={
                <AnimeListReloader
                  reloader={() => {
                    if (idNum) {
                      fetchInfoStream(idNum);
                    }
                  }}
                />
              }
              status={responseStream.status}
            />
          )
        }
      />
    </div>
  );
}
