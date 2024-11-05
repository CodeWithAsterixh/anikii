import { AnimeEpisode } from "@/mods/schemas";
import { SmileySad } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { Button } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { ViewDownloadAvailable } from "../components/EPISODED";
import Loader from "../components/loader";
import { HeadContent } from "../HeadContent";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import EpisodesNavigatorSection from "./EpisodesNavigatorSection";

type Props = { anime_episode?: string | null; played?: string };

function StreamingSection({ anime_episode, played }: Props) {
  const [streamDetails, setStreamDetails] = useState<AnimeEpisode | null>();
  const [streamUrlSelected, setStreamUrlSelected] = useState<{
    url: string;
    isVideoSrc?: boolean;
  }>({
    url: "",
    isVideoSrc: false,
  });
  const [downloadSources, setDownloadSources] = useState<{
    "640x360"?: string;
    "854x480"?: string;
    "1280x720"?: string;
    "1920x1080"?: string;
  } | null>(null);
  const [processStream, setProcessStream] = useState({
    loading: false,
    error: false,
  });

  const [processDownloads, setProcessDownloads] = useState({
    loading: false,
    error: false,
  });

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

  useEffect(() => {
    getStream();
  }, [getStream]);
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
    <>
      <HeadContent
        description={`Watch ${anime_episode} on Anikii with lesser ads and easy access.`}
        title={`You are watching: ${anime_episode}`}
        url={`www.anikii.vercel.app/watch?anime_episode=${anime_episode}`}
      />
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
            <EpisodesNavigatorSection
              anime_episode={anime_episode}
              played={played ? played : undefined}
            />
          </>
        )
      )}
    </>
  );
}

export default StreamingSection;
