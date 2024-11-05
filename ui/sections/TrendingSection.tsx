"use client";

import { AnimeTrending } from "@/mods/schemas";
import { SmileySad } from "@phosphor-icons/react/dist/ssr";
import { Button } from "flowbite-react";
import Loader from "../components/loader";
import MovieCard from "../major/MovieCard";
import { useEffect } from "react";

type prop = {
  error?: boolean;
  loading?: boolean;
  onReload?: () => void;
  trendingAnime?: AnimeTrending;
};
function TrendingSection({ error, loading, onReload, trendingAnime }: prop) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <section className="w-full h-fit p-2">
      {!error ? (
        loading ? (
          <Loader />
        ) : (
          <>
            <h3 className="text-secondary font-bold">Most Popular</h3>
            <div className="w-full h-fit flex items-start justify-start flex-wrap gap-2">
              {trendingAnime && (
                <>
                  {trendingAnime.anilistTrending.map((anime, index) => (
                    <MovieCard
                      key={index}
                      image={anime.coverImage.large}
                      title={anime.title.userPreferred}
                      rate={anime.averageScore}
                      id={anime.title.userPreferred.replace(" ", "-")}
                    />
                  ))}
                  {trendingAnime.gogoPopular.map((anime, index) => (
                    <MovieCard
                      key={index}
                      image={anime.image}
                      title={anime.title}
                      id={anime.id}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        )
      ) : (
        <h3 className="text-secondary w-full h-fit flex items-center flex-col gap-3 justify-center font-bold">
          <SmileySad className="text-5xl" weight="fill" /> Error loading Recent
          Trending anime
          <section className="w-full flex items-center justify-center h-fit p-2">
            <Button
              onClick={onReload}
              className="!bg-secondary !ring-0 !border-0 w-full min-[498px]:!w-fit"
            >
              Reload Trending anime
            </Button>
          </section>
        </h3>
      )}
    </section>
  );
}

export default TrendingSection;
