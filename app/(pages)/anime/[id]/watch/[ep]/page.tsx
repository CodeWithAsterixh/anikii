"use client";

import { setCurrentlyPlayed } from "@/store/reducers/listReducer";
import { AppDispatch, RootState } from "@/store/store";
import AnimeListReloader from "@/ui/components/AnimeList/Reloader";
import useAnimeInfos from "@/ui/hooks/useAnimeInfos";
import AnimeDetailsTabs from "@/ui/sections/AnimeInfo/AnimeDetailsTabs";
import AnimeInfoStream from "@/ui/sections/AnimeInfo/AnimeInfoStream";
import AnimeInfoStreamLoader from "@/ui/sections/AnimeInfo/AnimeInfoStreamSkeleton";
import AnimeViewer from "@/ui/sections/AnimeInfo/AnimeViewer";
import CharacterList from "@/ui/sections/AnimeInfo/Characters";
import Recommendations from "@/ui/sections/AnimeInfo/Recommendations";
import StreamingSection from "@/ui/sections/AnimeInfo/StreamLinks";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = object;

export default function Genres_GENRE({}: Props) {
  const {
    characters,
    fetchInfoCasts,
    fetchInfoStream,
    responseStream,
    recommendationsInfo,
    fetchRecommendations,
    fetchInfoStreamEp,
    streamer,
  } = useAnimeInfos();
  const currentlyPlayed = useSelector((s: RootState) => s.currentlyPlayed);
  const { id, ep } = useParams();
  const query = useSearchParams();
  const dub = query.get("dub");
  const [idNum, setIdNum] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (typeof id === "string") {
      const idNum = parseInt(id);
      if (!isNaN(idNum)) {
        setIdNum(idNum);
        fetchInfoStream(idNum);
        fetchInfoCasts(idNum);
        fetchRecommendations(idNum);

        if (typeof ep === "string") {
          const epNum = parseInt(ep);
          if (!isNaN(epNum)) {
            const isDub = dub === "true";
            fetchInfoStreamEp(idNum, epNum, isDub);
          }
        }
      }
    }
  }, [
    dub,
    ep,
    fetchInfoCasts,
    fetchInfoStream,
    fetchInfoStreamEp,
    fetchRecommendations,
    id,
  ]);
  useEffect(() => {
    if (!streamer.data?.srcs?.error) {
      dispatch(
        setCurrentlyPlayed({
          ok: true,
          status: "loading",
          data: {
            ...streamer.data,
            current: {
              title: streamer?.data?.srcs?.anime_info.title
                ? streamer?.data?.srcs?.anime_info.title
                : "",
              type: streamer?.data?.srcs?.stream_links[0].name
                ? streamer?.data?.srcs?.stream_links[0].name
                : "",
              url: streamer?.data?.srcs?.stream_links[0].url
                ? streamer?.data?.srcs?.stream_links[0].url
                : "",
            },
          },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamer?.data?.srcs]);
  useEffect(() => {
    console.log(streamer);
  }, [streamer]);

  return (
    <div className="w-full h-fit pb-10 px-2">
      <AnimeViewer
        type={currentlyPlayed.data?.current?.type}
        src={currentlyPlayed.data?.current?.url}
      />
      <StreamingSection
        episode={streamer.data?.srcs}
        loading={streamer.status === "loading"}
      />
      {currentlyPlayed.status === "error" && (
        <AnimeListReloader
          reloader={() => {
            if (idNum) {
              if (typeof ep === "string") {
                const epNum = parseInt(ep);
                if (!isNaN(epNum)) {
                  const isDub = dub === "true";
                  fetchInfoStreamEp(idNum, epNum, isDub);
                }
              }
            }
          }}
        />
      )}
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
