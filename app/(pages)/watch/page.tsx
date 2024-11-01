"use client";

import { ViewAllEps, ViewDownloadAvailable } from "@/ui/components/EPISODED";
import Loader from "@/ui/components/loader";
import MovieEPSliider from "@/ui/components/MovieEPSliider";
import MovieCard from "@/ui/major/MovieCard";
import VideoPlayer from "@/ui/VideoPlayer/VideoPlayer";
import { SmileySad } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { Button } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Anime } from "../anime/page";
import { anilistTrending } from "../page";

type Props = object;

interface Source {
  file: string;
  label: string;
  type: string;
}

interface Stream {
  Referer: string;
  sources: Source[];
  sources_bk: Source[];
}

interface Servers {
  vidcdn: string;
  streamwish: string;
  mp4upload: string;
  doodstream: string;
  vidhide: string;
}

interface AnimeEpisode {
  name: string;
  episodes: string;
  stream: Stream;
  servers: Servers;
}

function AnimeTitle({}: Props) {
  const query = useSearchParams();

  const anime_episode = query.get("anime_episode");

  const [recommendations, setRecommendations] = useState<anilistTrending[]>([]);
  const [streamDetails, setStreamDetails] = useState<AnimeEpisode | null>();
  const [downloadSources, setDownloadSources] = useState<{
    "640x360"?: string;
    "854x480"?: string;
    "1280x720"?: string;
    "1920x1080"?: string;
  } | null>(null);
  const [details, setDetails] = useState<Anime | null>(null);
  const [played, setPlayed] = useState<string | null>(null);

  const [streamUrlSelected, setStreamUrlSelected] = useState<{
    url: string;
    isVideoSrc?: boolean;
  }>({
    url: "",
    isVideoSrc: false,
  });

  const [processRecommend, setProcessRecommend] = useState({
    loading: false,
    error: false,
  });
  const [processStream, setProcessStream] = useState({
    loading: false,
    error: false,
  });
  const [processDetails, setProcessDetails] = useState({
    loading: false,
    error: false,
  });
  const [processDownloads, setProcessDownloads] = useState({
    loading: false,
    error: false,
  });

  const getRecommendations = useCallback(async () => {
    setProcessRecommend({ error: false, loading: true });
    try {
      const animes = await axios.get(
        `/api/recommendations?name=${anime_episode?.split("episode")[0]}`,
        {
          onDownloadProgress() {
            setProcessRecommend({ error: false, loading: true });
          },
          timeout: 10000,
        }
      );

      const animeResult = animes.data;

      setRecommendations(animeResult);
      setProcessRecommend({ error: false, loading: false });
    } catch (err) {
      setProcessRecommend({ error: true, loading: false });
      return err;
    }
  }, [anime_episode]);
  const getStream = useCallback(async () => {
    setProcessStream({ error: false, loading: true });
    try {
      const animes = await axios.get(
        `/api/stream?anime_episode=${anime_episode}`,
        {
          onDownloadProgress() {
            setProcessStream({ error: false, loading: true });
          },
          timeout: 10000,
        }
      );

      const animeResult = animes.data;

      setStreamDetails(animeResult);
      setProcessStream({ error: false, loading: false });
    } catch (err) {
      setProcessStream({ error: true, loading: false });
      return err;
    }
  }, [anime_episode]);
  const getDownloads = useCallback(async () => {
    setProcessDownloads({ error: false, loading: true });
    try {
      const animes = await axios.get(
        `/api/download?anime_episode=${anime_episode}`,
        {
          onDownloadProgress() {
            setProcessDownloads({ error: false, loading: true });
          },
          timeout: 10000,
        }
      );

      const animeResult = animes.data;

      setDownloadSources(animeResult);
      setProcessDownloads({ error: false, loading: false });
    } catch (err) {
      setProcessDownloads({ error: true, loading: false });
      return err;
    }
  }, [anime_episode]);
  const findAnimeDetails = useCallback(async () => {
    setProcessDetails({ error: false, loading: true });
    try {
      const animes = await axios.get(
        `/api/details?id=${anime_episode?.split("-episode")[0]}`,
        {
          onDownloadProgress() {
            setProcessDetails({ error: false, loading: true });
          },
          timeout: 10000,
        }
      );

      const animeResult = animes.data;

      setDetails(animeResult);
      setProcessDetails({ error: false, loading: false });
    } catch (err) {
      setProcessDetails({ error: true, loading: false });
      return err;
    }
  }, [anime_episode]);

  useEffect(() => {
    getRecommendations();
    getStream();
  }, [getRecommendations, getStream]);
  useEffect(() => {
    findAnimeDetails();
    if (anime_episode) {
      const splitEp = anime_episode.split("-episode-");
      setPlayed(splitEp[splitEp.length - 1]);
    }
  }, [anime_episode, findAnimeDetails]);
  function changeStreamServer(link: string, isVideoSrc: boolean = false) {
    setStreamUrlSelected({
      url: link,
      isVideoSrc,
    });
  }
  useEffect(() => {
    if (streamDetails) {
      changeStreamServer(streamDetails.stream.sources_bk[0].file, true);
    }
  }, [streamDetails]);

  const serverElements =
    streamDetails &&
    Object.entries(streamDetails.servers).map(([serverName, url]) => (
      <span
        onClick={() => changeStreamServer(url)}
        key={serverName}
        className="px-2 py-1 flex items-center justify-center border-2 border-base-black/60 dark:border-base-white/60 rounded-md"
      >
        {serverName}
      </span>
    ));

  return (
    <div className="w-full h-fit">
      {processStream.error ? (
        <h3 className="text-secondary w-full h-fit flex items-center justify-center flex-col gap-3 font-bold">
          <SmileySad className="text-5xl" weight="fill" /> Error loading movie
          Information
          <section className="w-full flex items-center justify-center h-fit p-2">
            <Button
              onClick={getStream}
              className="!bg-secondary !ring-0 !border-0 w-full min-[498px]:!w-fit"
            >
              Reload
            </Button>
          </section>
        </h3>
      ) : processStream.loading ? (
        <Loader />
      ) : (
        streamDetails && (
          <>
            <VideoPlayer
              content={{
                src: streamUrlSelected.url,
                isVideo: streamUrlSelected.isVideoSrc,
              }}
              name={anime_episode ? anime_episode : undefined}
            />
            <ul className="w-full flex flex-col items-center justify-center p-2 gap-4 shrink-0 text-base-black dark:text-base-white">
              <li className="w-fit text-center min-[498px]:text-left">
                <i className="ml-2 text-secondary not-italic">
                  you are watching:
                </i>{" "}
                {decodeURI(anime_episode ? anime_episode : "")}
              </li>
              <li className="w-fit flex items-center justify-center gap-2 flex-wrap ">
                <div className="w-fit *:cursor-pointer text-xs flex items-center justify-center flex-wrap gap-2">
                  {serverElements}
                  {streamDetails.stream.sources.map((src, index) => (
                    <span
                      key={index}
                      onClick={() => changeStreamServer(src.file, true)}
                      className="px-2 py-1 flex items-center justify-center border-2 border-base-black/60 dark:border-base-white/60 rounded-md"
                    >
                      Ad Free {index + 1}
                    </span>
                  ))}
                  {streamDetails.stream.sources_bk.map((src, index) => (
                    <span
                      key={index}
                      onClick={() => changeStreamServer(src.file, true)}
                      className="px-2 py-1 flex items-center justify-center border-2 border-base-black/60 dark:border-base-white/60 rounded-md"
                    >
                      Ad Free Reloaded {index + 1}
                    </span>
                  ))}
                </div>
              </li>
              <li>
                <ViewDownloadAvailable
                  isLoading={processDownloads.loading}
                  onClick={() => {
                    if (!downloadSources) {
                      getDownloads();
                    } else {
                      return;
                    }
                  }}
                  isError={processDownloads.error}
                  availableDownloads={
                    downloadSources
                      ? Object.entries(downloadSources).map(
                          ([quality, url]) => ({
                            quality,
                            url,
                            name: anime_episode ? anime_episode : undefined,
                          })
                        )
                      : undefined
                  }
                />
              </li>
            </ul>
            {processDetails.error ? (
              <h3 className="text-secondary w-full h-fit flex items-center justify-center flex-col gap-3 font-bold">
                <SmileySad className="text-5xl" weight="fill" /> Error loading
                movie Information
                <section className="w-full flex items-center justify-center h-fit p-2">
                  <Button
                    onClick={findAnimeDetails}
                    className="!bg-secondary !ring-0 !border-0 w-full min-[498px]:!w-fit"
                  >
                    Reload details
                  </Button>
                </section>
              </h3>
            ) : processDetails.loading ? (
              <Loader />
            ) : (
              details && (
                <>
                  <MovieEPSliider
                    episodes={
                      typeof details.episodes === "number"
                        ? Array.from(
                            { length: details.episodes },
                            (_, index) => ({
                              episodeNumber: index + 1,
                              episodeDesc: `${
                                anime_episode?.split("-episode")[0]
                              }-episode-${index + 1}`,
                              isPlaying:
                                index + 1 == parseInt(played ? played : "1"),
                            })
                          )
                        : details.episodes.map(([episodeNumber]) => ({
                            episodeNumber: parseInt(episodeNumber),
                            episodeDesc: `${
                              anime_episode?.split("-episode")[0]
                            }-episode-${episodeNumber}`,
                            isPlaying:
                              parseInt(episodeNumber) ==
                              parseInt(played ? played : "1"),
                          }))
                    }
                  />

                  <ViewAllEps
                    episodes={
                      typeof details.episodes === "number"
                        ? Array.from(
                            { length: details.episodes },
                            (_, index) => ({
                              episodeNumber: index + 1,
                              episodeDesc: `${
                                anime_episode?.split("-episode")[0]
                              }-episode-${index + 1}`,
                              isPlaying:
                                index + 1 == parseInt(played ? played : "1"),
                            })
                          )
                        : details.episodes.map(([episodeNumber]) => ({
                            episodeNumber: parseInt(episodeNumber),
                            episodeDesc: `${
                              anime_episode?.split("-episode")[0]
                            }-episode-${episodeNumber}`,
                            isPlaying:
                              parseInt(episodeNumber) ==
                              parseInt(played ? played : "1"),
                          }))
                    }
                  />
                </>
              )
            )}
          </>
        )
      )}
      {processRecommend.error ? (
        <h3 className="text-secondary w-full h-fit flex items-center justify-center flex-col gap-3 font-bold">
          <SmileySad className="text-5xl" weight="fill" /> Error loading movie
          Information
          <section className="w-full flex items-center justify-center h-fit p-2">
            <Button
              onClick={getRecommendations}
              className="!bg-secondary !ring-0 !border-0 w-full min-[498px]:!w-fit"
            >
              Reload recommendations
            </Button>
          </section>
        </h3>
      ) : processRecommend.loading ? (
        <Loader />
      ) : (
        recommendations && (
          <section className="w-full h-fit p-2">
            <h3 className="text-secondary font-bold">You may like</h3>
            <div className="w-full h-fit flex items-start justify-start flex-wrap gap-2">
              {recommendations.map((anime, index) => (
                <MovieCard
                  key={index}
                  image={anime.coverImage.large}
                  title={anime.title.userPreferred}
                  rate={anime.averageScore}
                  id={anime_episode?.split("episode")[0]}
                />
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
}

export default AnimeTitle;
