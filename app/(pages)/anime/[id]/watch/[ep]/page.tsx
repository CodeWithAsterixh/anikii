"use client";

import { RootState } from "@/store/store";
import AnimeListReloader from "@/ui/components/AnimeList/Reloader";
import useAnimeInfos from "@/ui/hooks/useAnimeInfos";
import AnimeDetailsTabs from "@/ui/sections/AnimeInfo/AnimeDetailsTabs";
import AnimeInfoStream from "@/ui/sections/AnimeInfo/AnimeInfoStream";
import AnimeInfoStreamLoader from "@/ui/sections/AnimeInfo/AnimeInfoStreamSkeleton";
import AnimeViewer from "@/ui/sections/AnimeInfo/AnimeViewer";
import CharacterList from "@/ui/sections/AnimeInfo/Characters";
import Recommendations from "@/ui/sections/AnimeInfo/Recommendations";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = object;

export default function Genres_GENRE({}: Props) {
  const {
    characters,
    fetchInfoCasts,
    fetchInfoStream,
    responseStream,
    recommendationsInfo,
    fetchRecommendations,
    fetchInfoStreamEp
  } = useAnimeInfos();
  const currentlyPlayed = useSelector((s: RootState) => s.currentlyPlayed);
  const { id,ep } = useParams();
  const query = useSearchParams();
    const dub = query.get("dub");
  const [idNum, setIdNum] = useState<number>();

  useEffect(() => {
    if (typeof id === "string") {
      const idNum = parseInt(id);
      if (!isNaN(idNum)) {
        setIdNum(idNum);
        if (responseStream.status !== "done") {
          fetchInfoStream(idNum);
        }

        if (characters.data.length <= 0) {
          fetchInfoCasts(idNum);
        }
        if (recommendationsInfo.data.length <= 0) {
          fetchRecommendations(idNum)
        }
        if (typeof ep === "string") {
          const epNum = parseInt(ep);
          if (!isNaN(epNum)) {
            const isDub = dub === "true" ? true : false;
    
            fetchInfoStreamEp(idNum, epNum,isDub);
    
        }
          }
      }
    }
  }, [fetchInfoCasts, fetchInfoStream, id, responseStream.data, characters.data, recommendationsInfo.data, fetchRecommendations, responseStream.status, ep, dub, fetchInfoStreamEp]);

  return (
    <div className="w-full h-fit pb-10 px-2">
      <AnimeViewer
        type={currentlyPlayed.data?.type}
        src={currentlyPlayed.data?.url}
      />
      <AnimeDetailsTabs
        casts={
          characters.status === "done" &&
          characters?.data &&
          idNum !== undefined ? (
            <CharacterList
              id={idNum}
              data={characters.data}
              pageInfo={characters.pageInfo}
            />
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
        recommendations={
          recommendationsInfo.status === "done" &&
          recommendationsInfo?.data &&
          idNum !== undefined ? (
            <Recommendations
              id={idNum}
              data={recommendationsInfo.data}
              pageInfo={recommendationsInfo.pageInfo}
            />
          ) : (
            <AnimeListReloader
              variant="grid"
              reloader={() => {
                if (idNum) {
                  fetchRecommendations(idNum);
                }
              }}
            />
          )
        }
      />
    </div>
  );
}
