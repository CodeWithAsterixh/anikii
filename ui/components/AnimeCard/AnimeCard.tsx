"use client";

import { AnimeListItem } from "@/lib/types/anime/__animeListItem";
import { Card } from "@mui/material";
import { ImageProps } from "next/image";
import Link from "next/link";
import React from "react";
import { BiPlayCircle } from "react-icons/bi";
import Image from "../Image/Image";
import clsx from "clsx";
type Props = {
  anime: AnimeListItem;
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
export default function AnimeCard({ anime,sx }: Props) {
  // const { trackable, handleAddToFavorite, handleRemoveFromFavorite } =
  //   useTracker();

  return (
    <Card {...sx?.cardProps} className={clsx(
      "w-full !flex !flex-col !gap-2 !isolate !bg-accent",
      sx?.cardProps?.className
    )}>
      <span className="bg-tertiary w-full isolate h-52 shrink-0 relative rounded-md group">
        <Image
          width={200}
          height={200}
          src={`${anime.coverImage.cover_image}`}
          alt={`${anime.title} image`}
          className="size-full z-0 group-hover:brightness-[.3] duration-300"
        />

        {/* status */}
        <span className="block absolute top-0 z-20 -right-1 bg-accent px-4 py-1 rounded-bl-lg text-tertiary text-xs">
          {anime.status}
        </span>
        {/* eps */}
        {anime?.episodes && (
          <span className="block absolute -bottom-2 z-20 -right-1 bg-accent px-4 py-1 rounded-tl-lg text-tertiary">
            eps|{anime.episodes}
          </span>
        )}

        {/* play */}
        <Link
          href={`/categories/${anime.id}`}
          className="absolute size-full inset-0 bg-transparent flex items-center justify-center group-hover:bg-black/30 opacity-0 group-hover:opacity-100 duration-500 z-10 rounded-md"
        >
          <BiPlayCircle className="text-3xl text-accent" />
        </Link>
      </span>
      <div className="w-full h-full flex flex-col justify-between gap-2 p-2 text-sm">
        <strong className="text-tertiary line-clamp-2">{anime.title}</strong>
        <strong className="text-tertiary">{anime.releaseDate}</strong>
      </div>
    </Card>
  );
}


