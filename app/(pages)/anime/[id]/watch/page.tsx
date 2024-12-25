"use client";

import { RootState } from "@/store/store";
import AnimeDetailsTabs from "@/ui/sections/AnimeInfo/AnimeDetailsTabs";
import AnimeInfoStream from "@/ui/sections/AnimeInfo/AnimeInfoStream";
import AnimeInfoStreamLoader from "@/ui/sections/AnimeInfo/AnimeInfoStreamSkeleton";
import AnimeViewer from "@/ui/sections/AnimeInfo/AnimeViewer";
import AnimeListReloader from "@/ui/components/AnimeList/Reloader";
import useAnimeInfos from "@/ui/hooks/useAnimeInfos";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CharacterList from "@/ui/sections/AnimeInfo/Characters";

type Props = object;

export default function Watch({}: Props) {
  const { responseStream, fetchInfoStream, characters, fetchInfoCasts } =
    useAnimeInfos();
  const currentlyPlayed = useSelector((s: RootState) => s.currentlyPlayed);

  const { id } = useParams();
  const [idNum, setIdNum] = useState<number>();

  useEffect(() => {
    if (typeof id === "string") {
      const idNum = parseInt(id);
      if (!isNaN(idNum)) {
        setIdNum(idNum);
        if (!responseStream.data) {
          fetchInfoStream(idNum);
        }
        if (!characters) {
          fetchInfoCasts(idNum);
        }
      }
    }
  }, [characters, fetchInfoCasts, fetchInfoStream, id, responseStream.data]);

  return (
    <div className="w-full h-fit pb-10 px-2">
      <AnimeViewer
        type={currentlyPlayed.data?.type}
        src={currentlyPlayed.data?.url}
      />
      <AnimeDetailsTabs
        casts={
          characters?.ok && characters.status == "done" ? (
            !characters?.data ? (
              "Loading casts"
            ) : (
              <CharacterList data={characters.data} />
            )
          ) : (
            "Loading casts"
          )
        }
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
