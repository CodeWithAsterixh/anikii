"use client";

import { getDetails } from "@/lib/mods/middlewares/getDetails";
import { AnimeDetails, process } from "@/lib/types/__anikii_api";
import Image from "@/ui/components/Image/Image";
import { Suspense, useCallback, useEffect, useState } from "react";
import AnimeCategSkeleton from "./VideoLoader";
import { EpisodeSection } from "./EpisodesSection";
import { parseAndFormatDates } from "@/lib/mods/functions/formatComplexDate";

type Props = {
  id: string;
};
interface details {
  data?: AnimeDetails;
  load?: process;
}

function AnimeDetailsSection({ id }: Props) {
  const [datas, setDatas] = useState<details>();

  const loadDetails = useCallback(async () => {
    let timing = 0;
    setDatas((dt) => ({
      ...dt,
      load: "loading",
    }));
    try {
      const data = await getDetails(id);
      setDatas({
        data,
        load: "done",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (timing < 4) {
        loadDetails();
        timing++;
      } else {
        setDatas((dt) => ({
          ...dt,
          load: "error",
        }));
      }
    }
  }, [id]);
  useEffect(() => {
    loadDetails();
  }, [loadDetails]);
  useEffect(() => {
    console.log(datas?.data);
  }, [datas]);
  return (
    <Suspense
      fallback={
        <AnimeCategSkeleton
          heading={{ loading: "Loading anime information ..." }}
        />
      }
    >
      <section className=" min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[40vh] md:h-[60vh]">
          {datas?.data?.image && (
            <Image
              className="w-full h-full object-cover rounded-lg brightness-50"
              src={datas?.data?.image}
              alt={datas?.data?.title}
            />
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="text-white text-3xl sm:text-5xl font-extrabold drop-shadow-lg">
              {datas?.data?.title}
            </h1>
            <p className="text-gray-200 mt-2 text-lg">{datas?.data?.episode}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="container max-w-7xl mx-auto py-8 px-4">
          {/* Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-base-black rounded-lg shadow-lg">
              <h4 className="text-gray-700 dark:text-gray-300 font-semibold">
                Last Released
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {datas?.data?.releaseDate &&
                  parseAndFormatDates(datas?.data?.releaseDate)[0]}
              </p>
            </div>
          </div>

          {/* Genres Section */}

          {/* Summary Section */}
          <div className="mt-8">
            <h3 className="text-gray-800 dark:text-white text-xl font-bold">
              Summary
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
              {datas?.data?.description}
            </p>
          </div>

          {/* Episode Listing */}
          {datas?.data?.episodes && (
            <EpisodeSection
              episodes={datas.data.episodes}
              totalEpisodes={datas.data.episodes.length}
            />
          )}
        </div>
      </section>
    </Suspense>
  );
}

export default AnimeDetailsSection;
