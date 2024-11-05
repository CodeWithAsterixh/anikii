"use client";

import { AnimeTrending } from "@/mods/schemas";
import Carousel from "../components/Carousel";

type prop = {
  loading?: boolean;
  trendingAnime?: AnimeTrending;
};
function CarouselSectionTrending({ loading, trendingAnime }: prop) {
  return (
    <Carousel
      animeTrend={
        trendingAnime ? trendingAnime.anilistTrending.slice(0, 4) : undefined
      }
      loading={loading}
    />
  );
}

export default CarouselSectionTrending;
