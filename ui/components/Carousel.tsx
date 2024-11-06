"use client";

import React from "react";
import { Button, Carousel as CarouselFlow } from "flowbite-react";
import clsx from "clsx";
import { glassMorphism } from "../styles/style";
import { useRouter } from "next/navigation";

import {
  CaretLeft,
  CaretRight,
  CircleNotch,
  Image as ImageIcon,
} from "@phosphor-icons/react/dist/ssr";
import { anilistTrending } from "@/mods/schemas";
import Link from "next/link";

type Props = {
  animeTrend?: anilistTrending[];
  loading?: boolean;
};

type CarouselItemProps = {
  imgUrl?: string;
  title?: string;
  rate?: number;
  id?: string | number;
};

const CarouselItem: React.FC<CarouselItemProps> = ({
  imgUrl,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  rate,
  title,
}) => {
  const router = useRouter();

  const handleOpen = () => router.push(`/anime?anime_id=${title}`);

  return (
    <div className="flex size-full items-end justify-end relative">
      <div className="size-full z-0 bg-gray-500 absolute top-0 left-0 flex items-center justify-center">
        {imgUrl ? (
          <img
            className="size-full object-center object-cover"
            src={imgUrl}
            alt={`${title} image`}
            width={500}
            height={500}
            loading="lazy"
          />
        ) : (
          <ImageIcon className="text-3xl animate-pulse" />
        )}
      </div>
      <ul className="w-full relative px-2 pb-2 bg-gradient-to-tr from-black/80 to-transparent">
        {rate && (
          <li className="text-secondary font-bold text-sm sm:text-base">
            #{Math.ceil((rate / 100) * 10)} Spotlight
          </li>
        )}
        {title && <li className="font-bold">{title}</li>}
        <li className="flex items-center gap-2">
          <Link href={`/watch?anime_episode=${title}-episode-1`}>
            <Button onClick={handleOpen} className="!bg-primary *:p-1">
              Watch now
            </Button>
          </Link>
          <Link href={`/anime?anime_id=${title}`}>
            <Button outline className="!bg-light-primary *:p-1">
              Details
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Carousel: React.FC<Props> = ({ animeTrend, loading }) => {
  const renderCarouselItem = (anime: anilistTrending, index: number) => (
    <CarouselItem
      key={index}
      imgUrl={anime.coverImage.extraLarge}
      id={anime.id}
      rate={anime.averageScore}
      title={anime.title.userPreferred}
    />
  );

  return (
    <CarouselFlow
      slide={false}
      className={clsx("w-full h-72 sm:h-96 isolate", glassMorphism.className)}
      indicators={false}
      leftControl={renderControlButton(CaretLeft, "left")}
      rightControl={renderControlButton(CaretRight, "right")}
    >
      {loading ? (
        <div className="flex size-full items-center justify-center relative">
          <CircleNotch
            weight="bold"
            size={25}
            className="text-5xl animate-spin"
          />
        </div>
      ) : (
        animeTrend?.map(renderCarouselItem)
      )}
    </CarouselFlow>
  );
};

// Control Button for Carousel
const renderControlButton = (
  Icon: React.ComponentType,
  position: "left" | "right"
) => (
  <span
    className={clsx(
      "h-1/4 flex items-center justify-center absolute top-1/2 -translate-y-1/2",
      `bg-black/30 rounded-${position === "left" ? "r" : "l"}-md`,
      "px-1 min-[300px]:px-2 sm:px-4"
    )}
  >
    <span
      className={clsx(
        "flex items-center justify-center p-2 text-lg min-[300px]:text-2xl sm:text-3xl rounded-full",
        glassMorphism.className
      )}
    >
      <Icon />
    </span>
  </span>
);

export default Carousel;
