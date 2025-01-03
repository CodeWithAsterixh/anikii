"use client";

import { getSeasonInfo } from "@/lib/mods/functions/getSeasonInfo";
import { ReleasesType } from "@/lib/types/anime/__releases";
import useTracker from "@/ui/hooks/useTracker";
import { Card, IconButton, Typography } from "@mui/material";
import clsx from "clsx";
import { ImageProps } from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { BiHeart } from "react-icons/bi";
import { BsFillHeartFill, BsPlayCircleFill } from "react-icons/bs";
import Image from "../Image/Image";
type Props = {
  anime: ReleasesType;
  id?: string;
  sx?: {
    cardProps?: { className: string };
    imageProps?: {
      container?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
      >;
      image?: React.FC<ImageProps>;
    };
    titleProps?: { className: string };
    extraProps?: { className: string };
  };
};

export function updateKeyForExtra<T>(
  array: T[],
  oldKey: keyof T,
  newKey: string
): (Omit<T, typeof oldKey> & { [key in typeof newKey]: T[keyof T] })[] {
  if (array.length > 0) {
    return array.map((obj) => {
      const { [oldKey]: value, ...rest } = obj;
      return {
        ...rest,
        [newKey]: value,
      } as Omit<T, typeof oldKey> & { [key in typeof newKey]: T[keyof T] };
    });
  } else {
    return [];
  }
}
export default function AnimeCard({ anime, sx }: Props) {
  const {trackable,handleAddToFavorite,handleRemoveFromFavorite} = useTracker()  

  return (
    <Card
      className={clsx(
        "flex gap-2 flex-col !bg-base-white group dark:!bg-base-black hover:scale-[.98] duration-500 !cursor-pointer",
        sx?.cardProps?.className
      )}
    >
      <span
        {...sx?.imageProps?.container}
        className={clsx(
          "w-full h-32 relative flex items-end isolate",
          sx?.imageProps?.container?.className
        )}
      >
        <Image
          alt={`image of ${anime.title.english} as ${anime.format}`}
          src={anime.coverImage.extraLarge}
          className="!size-full !absolute !inset-0 !-z-10"
          {...sx?.imageProps?.image}
        />
        <Link href={`/anime/${anime.id}`} className="size-full opacity-0 -z-10 duration-300 group-hover:z-[2] group-hover:opacity-100 absolute inset-0 bg-black/50 flex items-center justify-center">
          <IconButton>
            <BsPlayCircleFill className="text-white" />
          </IconButton>
        </Link>
        <span className="w-full absolute z-10 top-0 left-0 bg-gradient-to-b from-black to-transparent p-0 flex items-center justify-end">
          <Typography
            variant="caption"
            component="strong"
            className={clsx(
              "!w-fit !px-1 !py-0.5 !bg-neutral-700/20 rounded-sm !text-white",
              sx?.titleProps?.className
            )}
          >
            {anime.status}
          </Typography>
        </span>
        <span className="w-full relative z-10 bg-gradient-to-t from-black to-transparent px-2 py-1 flex items-center justify-between">
          <IconButton className="text-white" onClick={()=>{
            if(!trackable.favorite.find(f => f.id===anime.id)){
              handleAddToFavorite(anime)
              console.log(1)
            }else{
              handleRemoveFromFavorite(anime.id)
            }
          }}>
            
            {trackable.favorite.find(f => f.id===anime.id)?<BsFillHeartFill />:<BiHeart />}
          </IconButton>
          <Typography
            variant="caption"
            component="strong"
            className={clsx(
              "!w-fit !px-1 !py-0.5 !bg-neutral-300 rounded-sm",
              sx?.titleProps?.className
            )}
          >
            {anime.format}
          </Typography>
        </span>
      </span>
      <Typography
        variant="body2"
        component="strong"
        className={clsx(
          "text-center line-clamp-2 !px-2 !py-0 !text-black dark:!text-white !text-sm sm:!text-base !break-words !w-full",
          sx?.titleProps?.className
        )}
      >
        {anime.title.english || anime.title.romaji}
      </Typography>
      <Typography
        variant="caption"
        component="em"
        className={clsx(
          "text-center line-clamp-2 !px-2 !py-0 !text-neutral-600 dark:!text-neutral-400 not-italic !text-sm sm:!text-base !break-words !w-full",
          sx?.extraProps?.className
        )}
      >
        {anime.episodes
          ? anime.status === "RELEASING"
            ? `Se:${
                getSeasonInfo(anime.title.english || anime.title.romaji) || 1
              }` +
              ` nxt ep: ${anime.nextAiringEpisode?.episode}, total eps: ${anime.episodes}`
            : `Se:${
                getSeasonInfo(anime.title.english || anime.title.romaji) || 1
              }` + ` total eps: ${anime.episodes}`
          : "no ep info available"}
      </Typography>
      <div className="w-full flex items-center justify-start text-center text-neutral-600 dark:text-neutral-400 gap-2 overflow-x-hidden px-2">
        {anime.genres&&anime.genres.slice(0, 3).map((g, i) => (
          <Fragment key={i}>
            <Link href={`/genres/${g}`} className="!size-fit text-nowrap">
              {g}
            </Link>
            {i !== anime.genres.slice(0, 3).length - 1 && <>&bull;</>}
          </Fragment>
        ))}
      </div>
    </Card>
  );
}
