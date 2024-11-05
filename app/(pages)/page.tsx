"use client";
import { AnimeTrending, gogoPopular } from "@/mods/schemas";
import CarouselSectionTrending from "@/ui/sections/CarouselSectionTrending";
import RecentReleasesSection from "@/ui/sections/RecentReleasesSection";
import TrendingSection from "@/ui/sections/TrendingSection";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [recents, setRecents] = useState<gogoPopular[]>([]);
  const [processRecents, setProcessRecents] = useState({
    loading: true,
    error: false,
  });
  const [trendingAnime, setTrendingAnimes] = useState<
    AnimeTrending | undefined
  >();
  const [processTrends, setProcessTrends] = useState({
    loading: true,
    error: false,
  });

  async function loadRecents() {
    setProcessRecents({ error: false, loading: true });

    try {
      const animes = await axios.get(`/api/recents`, {
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
    setProcessTrends({ error: false, loading: true });

    try {
      const animes = await axios.get("/api/trending", {
        timeout: 10000,
      });

      const animeResult = animes.data;

      setTrendingAnimes(animeResult);
      setProcessTrends({ error: false, loading: false });
    } catch (error) {
      setProcessTrends({ error: true, loading: false });
      return error;
    }
  }

  useEffect(() => {
    loadRecents();
    getAnimeTrends();
  }, []);

  return (
    <>
      {!processTrends.error && (
        <CarouselSectionTrending
          loading={processTrends.loading}
          trendingAnime={trendingAnime}
        />
      )}

      <main className="w-full h-fit flex items-start justify-start flex-col gap-2 pt-5 pb-32">
        <TrendingSection
          loading={processTrends.loading}
          trendingAnime={trendingAnime}
          error={processTrends.error}
          onReload={getAnimeTrends}
        />

        <RecentReleasesSection
          error={processRecents.error}
          loading={processRecents.loading}
          onReload={loadRecents}
          recentReleaseList={recents}
        />
      </main>
    </>
  );
}
