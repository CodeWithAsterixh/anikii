"use client";

import React, { useCallback, useState } from "react";
import MovieCard from "../major/MovieCard";
import { Button } from "flowbite-react";
import { SmileySad } from "@phosphor-icons/react/dist/ssr";
import { anilistTrending } from "@/mods/schemas";
import axios from "axios";
import Loader from "../components/loader";

type Props = { anime_episode?: string | null };

function RecommendationsSection({ anime_episode }: Props) {
  const [processRecommend, setProcessRecommend] = useState({
    loading: false,
    error: false,
  });
  const [recommendations, setRecommendations] = useState<anilistTrending[]>([]);

  const getRecommendations = useCallback(async () => {
    setProcessRecommend({ error: false, loading: true });
    try {
      const animes = await axios.get(
        `/api/recommendations?name=${anime_episode?.split("episode")[0]}`,
        {
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
  return (
    <>
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
    </>
  );
}

export default RecommendationsSection;
