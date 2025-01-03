"use client";

import AnimeDetailsTabs from "@/ui/sections/AnimeInfo/AnimeDetailsTabs";
import AnimeInfoCard from "@/ui/sections/AnimeInfo/AnimeInfoCard";
import AnimeInfoStream from "@/ui/sections/AnimeInfo/AnimeInfoStream";
import AnimeInfoStreamLoader from "@/ui/sections/AnimeInfo/AnimeInfoStreamSkeleton";
import AnimeListReloader from "@/ui/components/AnimeList/Reloader";
import useAnimeInfos from "@/ui/hooks/useAnimeInfos";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CharacterList from "@/ui/sections/AnimeInfo/Characters";

type Props = object;

export default function Genres_GENRE({}: Props) {
  const { characters,fetchInfoCasts,response, fetchInfo, fetchInfoStream, responseStream } =
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
        fetchInfoCasts(idNum);
      }
    }
  }, [fetchInfo, fetchInfoCasts, fetchInfoStream, id]);

  


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
        casts={characters?.data?<CharacterList data={characters.data} />:<AnimeInfoStreamLoader
        reloader={
          <AnimeListReloader
            reloader={() => {
              if (idNum) {
                fetchInfoCasts(idNum);
              }
            }}
          />
        }
        status={characters?.status||"loading"}
      />}
        stream={
          responseStream.status === "done" ? (
            responseStream.data && <AnimeInfoStream  id={idNum?idNum:1} data={responseStream.data} />
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
