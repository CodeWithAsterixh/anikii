"use client";

import { getDetails } from "@/lib/mods/middlewares/getDetails";
import { AnimeDetails, process } from "@/lib/types/__anikii_api";
import Image from "@/ui/components/Image/Image";
import { useCallback, useEffect, useState } from "react";
import { EpisodeSection } from "./EpisodesSection";

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
    <section className="bg-transparent min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[60vh]">
        <div className="h-full">
          {datas?.data?.image && (
            <>
              <Image
                className="w-full h-full object-cover rounded-lg brightness-50"
                src={datas?.data?.image}
                alt={datas?.data?.title}
              />
            </>
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-center px-2 text-2xl sm:text-3xl font-bold">
            {datas?.data?.title}
          </h2>
        </div>
      </div>

      {/* Details Section */}
      <div className="container max-w-7xl py-4">
        <div className="flex flex-wrap gap-4">
          {/* Type Section */}
          <div className="flex-1 min-w-[250px] p-4 bg-base-white dark:bg-base-black rounded-lg shadow-md">
            <h6 className="text-gray-700 dark:text-gray-300 font-bold">Type</h6>
            <p className="text-gray-600 dark:text-gray-400">
              {datas?.data?.type}
            </p>
          </div>

          {/* Status Section */}
          <div className="flex-1 min-w-[250px] p-4 bg-base-white dark:bg-base-black rounded-lg shadow-md">
            <h6 className="text-gray-700 dark:text-gray-300 font-bold">
              Status
            </h6>
            <p className="text-gray-600 dark:text-gray-400">
              {datas?.data?.status}
            </p>
          </div>

          {/* Released Section */}
          <div className="flex-1 min-w-[250px] p-4 bg-base-white dark:bg-base-black rounded-lg shadow-md">
            <h6 className="text-gray-700 dark:text-gray-300 font-bold">
              Released
            </h6>
            <p className="text-gray-600 dark:text-gray-400">
              {datas?.data?.released}
            </p>
          </div>
        </div>
      </div>

      {/* Genres Section */}
      <div className="container max-w-7xl py-4">
        <div className="p-4 bg-base-white dark:bg-base-black rounded-lg shadow-md">
          <h6 className="text-gray-700 dark:text-gray-300 font-bold">Genres</h6>
          <div className="flex flex-wrap gap-2 mt-2">
            {datas?.data?.genres.split(",").map((genre, idx) => (
              <span
                key={idx}
                className="bg-purple-100 dark:bg-purple-600 text-base-black dark:text-base-white py-1 px-3 rounded-full text-sm"
              >
                {genre.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="container max-w-7xl py-4">
        <div className="p-4 bg-base-white dark:bg-base-black rounded-lg shadow-md">
          <h5 className="text-gray-800 dark:text-gray-100 font-bold">
            Summary
          </h5>
          <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            {datas?.data?.summary}
          </p>
        </div>
      </div>

      {/* Additional Info Section */}
      {datas?.data?.totalEpisodes && (
        <EpisodeSection
          id={id}
          totalEpisodes={parseInt(datas?.data?.totalEpisodes)}
        />
      )}
    </section>
  );
}

export default AnimeDetailsSection;
