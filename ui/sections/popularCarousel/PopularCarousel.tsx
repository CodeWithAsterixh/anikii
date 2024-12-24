"use client";

import { ReleasesType } from "@/lib/types/anime/__releases";
import Carousel from "@/ui/components/carousel/Carousel";
import CarouselItem from "@/ui/components/carousel/CarouselItem";
import CarouselItemSkeleton from "@/ui/components/carousel/CarouselItemSkeleton";
import usePopular from "@/ui/hooks/usePopularHook";
import { useEffect, useState } from "react";

function PopularCarousel() {
  const [dataSorted, setDataSorted] = useState<ReleasesType[]>([]);
  const { fetchPopular, response } = usePopular();

  useEffect(() => {
    if (response.status === "not initiated") {
      fetchPopular();
    }
  }, [fetchPopular, response.status]);
  useEffect(() => {
    if (dataSorted.length < 1) {
      const datasort: ReleasesType[] = response.data.slice(0, 10);
      setDataSorted(datasort);
    }
  }, [dataSorted.length, response.data]);

  return (
    <>
      <Carousel
        stylings={{
          SwipeableViewsContainer: {
            styling: {
              maxWidth: "700px",
              justifyContent: "flex-start",
            },
          },
        }}
        backdropEffect={{
          colors: dataSorted
            ? dataSorted.map((anime) => anime.coverImage.color)
            : [
                "rgb(203,64,24)",
                "rgb(177,117,108)",
                "rgb(154,109,8)",
                "rgb(31,33,11)",
              ],
        }}
      >
        {dataSorted.length > 0 ? (
          dataSorted.map((ci, ind) => (
            <CarouselItem key={ind} data={ci} index={ind + 1} />
          ))
        ) : (
          <>
            <CarouselItemSkeleton />
          </>
        )}
      </Carousel>
    </>
  );
}

export default PopularCarousel;
