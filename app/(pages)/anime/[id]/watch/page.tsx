"use client";

import { RootState } from "@/store/store";
import AnimeDetailsTabs from "@/ui/components/AnimeCard/AnimeDetailsTabs";
import AnimeInfoStream from "@/ui/components/AnimeCard/AnimeInfoStream";
import AnimeInfoStreamLoader from "@/ui/components/AnimeCard/AnimeInfoStreamSkeleton";
import AnimeViewer from "@/ui/components/AnimeCard/AnimeViewer";
import AnimeListReloader from "@/ui/components/AnimeList/Reloader";
import useAnimeInfos from "@/ui/hooks/useAnimeInfos";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = object;

export default function Watch({}: Props) {
  const { responseStream,fetchInfoStream } = useAnimeInfos();
  const currentlyPlayed = useSelector((s: RootState) => s.currentlyPlayed);

  const { id } = useParams();
  const [idNum, setIdNum] = useState<number>();

  useEffect(() => {
    if (typeof id === "string") {
      const idNum = parseInt(id);
      if (!isNaN(idNum)) {
        setIdNum(idNum);
        if(!responseStream.data){
          fetchInfoStream(idNum);
        }
      }
    }
  }, [fetchInfoStream, id, responseStream.data]);
  



  return (
    <div className="w-full h-fit pb-10 px-2">
      <AnimeViewer type={currentlyPlayed.data?.type} src={currentlyPlayed.data?.url}/>
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
