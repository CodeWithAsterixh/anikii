"use client";

import { Card, IconButton, Typography } from "@mui/material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Image from "../Image/Image";
import { BiHeart } from "react-icons/bi";
import { ImageProps } from "next/image";
import Link from "next/link";
type Props = {
  image?: string;
  title?: string;
  extra?: string;
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
export default function AnimeCard({
  extra = "extra",
  image = "/example.JPG",
  title = "title",
  sx,
  id,
}: Props) {
  const [isDub, setIsDub] = useState(false);
  useEffect(() => {
    if (title.toLowerCase().includes("dub")) {
      setIsDub(true);
    }
  }, [title]);

  return (
    <Card
      className={clsx(
        "flex gap-2 flex-col !bg-base-white dark:!bg-base-black hover:scale-[.98] duration-500 !cursor-pointer",
        sx?.cardProps?.className
      )}
    >
      <Link href={`/see/${id}`} className="w-full">
        <span
          {...sx?.imageProps?.container}
          className={clsx(
            "w-full h-32 relative flex items-end isolate",
            sx?.imageProps?.container?.className
          )}
        >
          <Image
            alt={`image of ${title} ${extra}`}
            src={image}
            className="!size-full !absolute !inset-0 !-z-10"
            {...sx?.imageProps?.image}
          />
          <span className="w-full bg-gradient-to-t from-black to-transparent px-2 py-1 flex items-center justify-between">
            <IconButton className="text-white">
              <BiHeart />
            </IconButton>
            <Typography
              variant="caption"
              component="strong"
              className={clsx(
                "!w-fit !px-1 !py-0.5 !bg-neutral-300 rounded-sm",
                sx?.titleProps?.className
              )}
            >
              {isDub ? "D" : "S"}UB
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
          {title}
        </Typography>
        <Typography
          variant="caption"
          component="em"
          className={clsx(
            "text-center line-clamp-2 !px-2 !py-0 !text-black dark:!text-white not-italic !text-sm sm:!text-base !break-words !w-full",
            sx?.extraProps?.className
          )}
        >
          {extra}
        </Typography>
      </Link>
    </Card>
  );
}
