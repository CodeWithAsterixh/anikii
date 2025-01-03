"use client";

import { RootState } from "@/store/store";
import AnimeListReloader from "@/ui/components/AnimeList/Reloader";
import useAnimeInfos from "@/ui/hooks/useAnimeInfos";
import AnimeDetailsTabs from "@/ui/sections/AnimeInfo/AnimeDetailsTabs";
import AnimeInfoStream from "@/ui/sections/AnimeInfo/AnimeInfoStream";
import AnimeInfoStreamLoader from "@/ui/sections/AnimeInfo/AnimeInfoStreamSkeleton";
import AnimeViewer from "@/ui/sections/AnimeInfo/AnimeViewer";
import CharacterList from "@/ui/sections/AnimeInfo/Characters";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = object;

export default function Genres_GENRE({}: Props) {
  const {
    characters,
    fetchInfoCasts,
    fetchInfo,
    fetchInfoStream,
    responseStream,
  } = useAnimeInfos();
  const currentlyPlayed = useSelector((s: RootState) => s.currentlyPlayed);
  const { id} = useParams();
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
      <AnimeViewer
        type={currentlyPlayed.data?.type}
        src={currentlyPlayed.data?.url}
      />
      <AnimeDetailsTabs
        casts={
          characters?.data ? (
            <CharacterList data={characters.data} />
          ) : (
            <AnimeInfoStreamLoader
              reloader={
                <AnimeListReloader
                  reloader={() => {
                    if (idNum) {
                      fetchInfoCasts(idNum);
                    }
                  }}
                />
              }
              status={characters?.status || "loading"}
            />
          )
        }
        stream={
          responseStream.status === "done" ? (
            responseStream.data && (
              <AnimeInfoStream
                id={idNum ? idNum : 1}
                data={responseStream.data}
              />
            )
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
