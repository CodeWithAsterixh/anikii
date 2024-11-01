"use client";
import Carousel from "@/ui/components/Carousel";
import Loader from "@/ui/components/loader";
import MovieCard from "@/ui/major/MovieCard";
import { SmileySad } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";

export interface anilistTrending {
  id: number;
  status: string;
  title: {
    userPreferred: string;
    romaji: string;
    english: string;
    native: string;
  };
  genres: string[];
  description: string;
  format: string;
  bannerImage: string;
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  episodes: number;
  meanScore: number;
  season: string;
  seasonYear: number;
  averageScore: number;
}
export interface gogoPopular {
  title: string;
  releaseDate: string;
  image: string;
  img: string;
  link: string;
  id: string;
}
type AnimeTrending = {
  anilistTrending: anilistTrending[];
  gogoPopular: gogoPopular[];
};
export default function Home() {
  const [animesTrending, setAnimesTrending] = useState<AnimeTrending | null>(
    null
  );
  const [processAnimesTrending, setProcessAnimesTrending] = useState({
    loading: true,
    error: false,
  });
  const [recents, setRecents] = useState<gogoPopular[]>([]);
  const [processRecents, setProcessRecents] = useState({
    loading: true,
    error: false,
  });
  async function loadRecents() {
    setProcessRecents({ error: false, loading: true });

    try {
      const animes = await axios.get(`/api/recents`, {
        onDownloadProgress() {
          setProcessRecents({ error: false, loading: true });
        },
        timeout: 10000,
      });

      const animeResult = animes.data;

      setRecents(animeResult);
      setProcessRecents({ error: false, loading: false });
    } catch (error) {
      setProcessRecents({ error: true, loading: false });

      return error;
    }
  }
  async function getAnimeTrends() {
    setProcessAnimesTrending({ error: false, loading: true });
    try {
      const animes = await axios.get("/api/trending", {
        onDownloadProgress() {
          setProcessAnimesTrending({ error: false, loading: true });
        },
        timeout: 10000,
      });

      const animeResult = animes.data;

      setAnimesTrending(animeResult);
      setProcessAnimesTrending({ error: false, loading: false });
    } catch (error) {
      setProcessAnimesTrending({ error: true, loading: false });

      return error;
    }
  }
  useEffect(() => {
    getAnimeTrends();
    loadRecents();
  }, []);

  return (
    <>
      {!processAnimesTrending.error && (
        <Carousel
          animeTrend={
            animesTrending
              ? animesTrending.anilistTrending.slice(0, 4)
              : undefined
          }
          loading={processAnimesTrending.loading}
        />
      )}
      <main className="w-full h-fit flex items-start justify-start flex-col gap-2 pt-5 pb-32">
        <section className="w-full h-fit p-2">
          {!processAnimesTrending.error ? (
            processAnimesTrending.loading ? (
              <Loader />
            ) : (
              <>
                <h3 className="text-secondary font-bold">Most Popular</h3>
                <div className="w-full h-fit flex items-start justify-start flex-wrap gap-2">
                  {animesTrending && (
                    <>
                      {animesTrending.anilistTrending.map((anime, index) => (
                        <MovieCard
                          key={index}
                          image={anime.coverImage.large}
                          title={anime.title.userPreferred}
                          rate={anime.averageScore}
                          id={anime.title.userPreferred.replace(" ", "-")}
                        />
                      ))}
                      {animesTrending.gogoPopular.map((anime, index) => (
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
            <h3 className="text-secondary w-full h-fit flex items-center justify-center flex-col gap-3 font-bold">
              <SmileySad className="text-5xl" weight="fill" /> Error loading
              Trending anime
              <section className="w-full flex items-center justify-center h-fit p-2">
                <Button
                  onClick={getAnimeTrends}
                  className="!bg-secondary !ring-0 !border-0 w-full min-[498px]:!w-fit"
                >
                  Reload Trending
                </Button>
              </section>
            </h3>
          )}
        </section>
        <section className="w-full h-fit p-2">
          {!processRecents.error ? (
            processRecents.loading ? (
              <Loader />
            ) : (
              <>
                <h3 className="text-secondary font-bold">Recent Releases</h3>
                <div className="w-full h-fit flex items-start justify-start flex-wrap gap-2">
                  {recents &&
                    recents.map((anime, index) => (
                      <MovieCard
                        key={index}
                        image={anime.image}
                        title={anime.title}
                        id={anime.id}
                      />
                    ))}
                </div>
              </>
            )
          ) : (
            <h3 className="text-secondary w-full h-fit flex items-center flex-col gap-3 justify-center font-bold">
              <SmileySad className="text-5xl" weight="fill" /> Error loading
              Recent Releases
              <section className="w-full flex items-center justify-center h-fit p-2">
                <Button
                  onClick={loadRecents}
                  className="!bg-secondary !ring-0 !border-0 w-full min-[498px]:!w-fit"
                >
                  Reload Recents
                </Button>
              </section>
            </h3>
          )}
        </section>
      </main>
    </>
  );
}
