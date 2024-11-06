"use client";

import { Anime } from "@/mods/schemas";
import { ViewAllEps } from "@/ui/components/EPISODED";
import Loader from "@/ui/components/loader";
import MovieEPSliider from "@/ui/components/MovieEPSliider";
import RecommendationsSection from "@/ui/sections/RecommendationsSection";
import { SmileySad } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import clsx from "clsx";
import { Button } from "flowbite-react";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HeadContent } from "../../../ui/HeadContent";

type Props = object;

function AnimeDescription({}: Props) {
  const params = useSearchParams();
  const id = params.get("anime_id");
  const router = useRouter();
  const navigate = router.push;
  const [details, setDetails] = useState<Anime | null>(null);
  const [process, setProcess] = useState({
    loading: false,
    error: false,
  });

  const findAnimeDetails = useCallback(async () => {
    setProcess({ error: false, loading: true });
    try {
      const animes = await axios.get(`/api/details?id=${id}`, {
        onDownloadProgress() {
          setProcess({ error: false, loading: true });
        },
        timeout: 10000,
      });

      const animeResult = animes.data;

      setDetails(animeResult);
      setProcess({ error: false, loading: false });
    } catch (err) {
      setProcess({ error: true, loading: false });
      return err;
    }
  }, [id]);

  useEffect(() => {
    findAnimeDetails();
  }, [findAnimeDetails, id]);
  useEffect(() => {
    console.log(details);
  }, [details]);

  return (
    <>
      <HeadContent
        description={`${id} ${details?.description}`}
        title={`Anikii | ${details?.name}`}
        url={`www.anikii.vercel.app/anime?anime_id=${id}`}
      />
      {process.error ? (
        <h3 className="text-secondary w-full h-fit flex items-center justify-center flex-col gap-3 font-bold">
          <SmileySad className="text-5xl" weight="fill" /> Error loading movie
          Information
          <section className="w-full flex items-center justify-center h-fit p-2">
            <Button
              onClick={findAnimeDetails}
              className="!bg-secondary !ring-0 !border-0 w-full min-[498px]:!w-fit"
            >
              Reload anime details
            </Button>
          </section>
        </h3>
      ) : process.loading ? (
        <Loader />
      ) : (
        details && (
          <>
            <section className="w-full h-fit p-0 relative isolate flex flex-col items-center min-[498px]:items-start min-[498px]:flex-row justify-start">
              {/* place image as a blurred bg-image that fill the container in this space */}
              <span
                className={clsx(
                  "w-full h-full absolute inset-0 -z-[1]",
                  "brightness-50 blur-xl"
                )}
              >
                <img
                  className="size-full object-cover object-center"
                  src={
                    details.bannerImage ? details.bannerImage : details.image
                  }
                  alt={details.name}
                  width={500}
                  height={500}
                  
                />
              </span>
              {/* ----------------------------- */}

              <div className="w-3/4 m-2 min-w-[80vw] min-[320px]:min-w-48 min-[498px]:w-36 sm:w-48 h-40 min-[498px]:h-52 sm:h-60 min-[498px]:!min-h-full relative border-4 border-base-white rounded-md shrink-0">
                <img
                  className="size-full object-cover object-center"
                  src={
                    details.coverImage
                      ? details.coverImage.extraLarge
                      : details.image
           }
                  alt={details.name}
                  width={500}
                  height={500}
        
                />
              </div>
              <article className="w-full h-fit flex  flex-col sm:flex-row items-center min-[498px]:items-start justify-start gap-2 ">
                <ul className="w-fit flex flex-col items-center min-[498px]:items-start justify-center p-2 gap-4 shrink-0">
                  <li className="w-fit text-center min-[498px]:text-left text-base-white">
                    {details.title ? details.title.userPreferred : details.name}
                  </li>
                  <li className="w-fit flex items-center justify-center gap-2 flex-wrap text-base-white">
                    <div className="w-fit text-xs flex items-center justify-center gap-2">
                      <span className="px-2 py-1 flex items-center justify-center border-2 border-base-white/60 rounded-md">
                        HD
                      </span>
                      <span className="px-2 py-1 flex items-center justify-center border-2 border-base-white/60 rounded-md">
                        EP
                        {typeof details.episodes === "number"
                          ? details.episodes
                          : details.episodes.length}
                      </span>
                    </div>
                    <p className="capitalize">
                      {details.season
                        ? `${details.season} ${details.seasonYear} ${details.type}`
                        : details.type}
                    </p>
                  </li>
                  <li>
                    <Button
                      onClick={() =>
                        navigate(
                         `/watch?anime_episode=${id}-episode-1`
                        )
                      }
                      className="!bg-secondary !ring-0 !border-0"
                    >
                      Watch now
                    </Button>
                  </li>
                </ul>
                <ul className="w-full text-base-white bg-base-black/30 h-full p-2 flex flex-col items-start justify-center gap-4">
                  <li className=" h-fit text-sm sm:text-base flex flex-col items-start justify-start">
                    <h4 className="font-bold">Overview:</h4>
                    <p className="max-h-28 overflow-y-auto scrollbar-h">
                      {details.description
                        ? details.description
                        : details.plot_summary}
                    </p>
                  </li>
                  <li className=" h-fit text-sm sm:text-base flex flex-col items-start justify-start">
                    <p className="max-h-28 overflow-y-auto">
                      <span className="font-bold float-start pr-2">
                        Other names:
                      </span>
                      {details.other_name ? (
                        details.other_name
                      ) : (
                        <>
                          {details.title.english &&
                            details.title.english + ", "}
                          {details.title.native && details.title.native + ", "}
                          {details.title.romaji && details.title.romaji + ", "}
                        </>
                      )}
                    </p>
                  </li>
                  <li className=" h-fit text-sm sm:text-base flex flex-col items-start justify-start">
                    <h4 className="font-bold">Genres:</h4>
                    <div className="w-full flex flex-wrap items-start justify-start gap-2">
                      {details.genres
                        ? details.genres.map((g, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 not-italic flex items-center justify-center border-2 border-base-white/60 rounded-full"
                            >
                              {g.trimEnd().trimStart()}
                            </span>
                          ))
                        : details.genre &&
                          details.genre.split(",").map((g, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 not-italic flex items-center justify-center border-2 border-base-white/60 rounded-full"
                            >
                              {g.trimEnd().trimStart()}
                            </span>
                          ))}
                    </div>
                  </li>
                </ul>
              </article>
            </section>
            <MovieEPSliider
              episodes={
                typeof details.episodes === "number"
                  ? Array.from({ length: details.episodes }, (_, index) => ({
                      episodeNumber: index + 1,
                      episodeDesc: `${id}-episode-${index + 1}`,
                    }))
                  : details.episodes.map(([episodeNumber]) => ({
                      episodeNumber: parseInt(episodeNumber),
                      episodeDesc: `${id}-episode-${episodeNumber}`,
                    }))
              }
            />

            <ViewAllEps
              episodes={
                typeof details.episodes === "number"
                  ? Array.from({ length: details.episodes }, (_, index) => ({
                      episodeNumber: index + 1,
                      episodeDesc: `${id}-episode-${index + 1}`,
                    }))
                  : details.episodes.map(([episodeNumber]) => ({
                      episodeNumber: parseInt(episodeNumber),
                      episodeDesc: `${id}-episode-${episodeNumber}`,
                    }))
              }
            />
          </>
        )
      )}
      <RecommendationsSection anime_episode={id} />
    </>
  );
}

export default AnimeDescription;
