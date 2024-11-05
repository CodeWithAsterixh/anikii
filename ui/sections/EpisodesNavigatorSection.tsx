"use client";

import { SmileySad } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { Button } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { ViewAllEps } from "../components/EPISODED";
import MovieEPSliider from "../components/MovieEPSliider";
import Loader from "../components/loader";
import { Anime } from "@/mods/schemas";

type Props = { anime_episode?: string | null; played?: string };

function EpisodesNavigatorSection({ anime_episode, played = "-1" }: Props) {
  const [details, setDetails] = useState<Anime | null>(null);
  const [processDetails, setProcessDetails] = useState({
    loading: false,
    error: false,
  });

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
    findAnimeDetails();
  }, [findAnimeDetails]);

  return (
    <>
      {processDetails.error ? (
        <h3 className="text-secondary w-full h-fit flex items-center justify-center flex-col gap-3 font-bold">
          <SmileySad className="text-5xl" weight="fill" /> Error loading movie
          Information
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
                  ? Array.from({ length: details.episodes }, (_, index) => ({
                      episodeNumber: index + 1,
                      episodeDesc: `${
                        anime_episode?.split("-episode")[0]
                      }-episode-${index + 1}`,
                      isPlaying: index + 1 == parseInt(played ? played : "1"),
                    }))
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
                  ? Array.from({ length: details.episodes }, (_, index) => ({
                      episodeNumber: index + 1,
                      episodeDesc: `${
                        anime_episode?.split("-episode")[0]
                      }-episode-${index + 1}`,
                      isPlaying: index + 1 == parseInt(played ? played : "1"),
                    }))
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
  );
}

export default EpisodesNavigatorSection;
