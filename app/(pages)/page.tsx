"use client";

import usePagerQuery from "@/hooks/usePagerQuery";
import { AnimeListItem } from "@/lib/types/anime/__animeListItem";
import Carousel from "@/ui/components/carousel/Carousel";
import CarouselItem from "@/ui/components/carousel/CarouselItem";
import GenreList from "@/ui/components/GenreList/GenreList";
import Loader from "@/ui/components/Loader/Loader";
import MayLike from "@/ui/sections/homeSection/mayLike";
import Popular from "@/ui/sections/homeSection/popular";
import { useEffect, useState } from "react";

type Props = object;

export default function Home({}: Props) {
  const { data, status } = usePagerQuery("/popular");
  const releases = usePagerQuery("/popular/releases");
  const [carouselData, setCarouselData] = useState<AnimeListItem[]>([]);

  useEffect(() => {
    if (data && data.data) {
      setCarouselData(
        data.data.sort((a, b) => b.trending - a.trending).slice(0, 10)
      );
    }
  }, [data]);

  return (
    <div className="w-full h-fit md:h-full grid sm:grid-cols-1 md:grid-cols-[4fr_2fr] gap-2 pt-2 sm:px-2">
      <div className="w-full md:h-full md:overflow-y-auto">
        <Carousel>
          {status.status === "done" ? (
            carouselData.map((d, i) => (
              <CarouselItem index={i + 1} key={i} data={d}></CarouselItem>
            ))
          ) : (
            <div className="w-full h-[50vh] flex items-center justify-center">
              {" "}
              <Loader />{" "}
            </div>
          )}
        </Carousel>
        <GenreList />
        <Popular data={data?.data} />
      </div>
      <MayLike data={releases.data?.data} status={releases.status.status} />
    </div>
  );
}

{
  /* */
}
