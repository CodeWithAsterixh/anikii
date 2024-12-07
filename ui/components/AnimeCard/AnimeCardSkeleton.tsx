"use client";

import { Card, Skeleton } from "@mui/material";
import clsx from "clsx";
import React from "react";
type Props = {
  sx?: {
    cardProps?: { className: string };
    imageProps?: {
      container?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
      >;
    };
    titleProps?: { className: string };
    extraProps?: { className: string };
  };
};

export default function AnimeCardSkeleton({ sx }: Props) {
  return (
    <Card
      className={clsx(
        "flex gap-2 flex-col items-center !bg-base-white dark:!bg-base-black hover:scale-[.98] duration-500 !cursor-pointer",
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
        <Skeleton
          variant="rectangular"
          animation="wave"
          className="!size-full !absolute !inset-0 !-z-10"
        />
        <span className="w-full bg-gradient-to-t from-black to-transparent px-2 py-1 flex items-center justify-between">
          <Skeleton
            variant="circular"
            animation="wave"
            className="!size-7 bg-base-black/50 dark:bg-base-white/50"
          />
          <Skeleton
            variant="text"
            className={clsx(
              "!w-12 !text-base !px-1 !py-0.5 !bg-neutral-300 rounded-sm",
              sx?.titleProps?.className
            )}
          />
        </span>
      </span>

      <div className="w-full h-fit flex flex-col gap-1 items-center px-2">
        <Skeleton
          variant="text"
          className={clsx(
            "!w-full text-center line-clamp-2 !px-2 !py-0 !text-black dark:!text-white !text-sm sm:!text-base !break-words",
            sx?.titleProps?.className
          )}
        />
        <Skeleton
          variant="text"
          className={clsx(
            "!w-[80%] text-center line-clamp-2 !px-2 !py-0 !text-black dark:!text-white !text-sm sm:!text-base !break-words ",
            sx?.titleProps?.className
          )}
        />
      </div>

      <Skeleton
        variant="text"
        className={clsx(
          "!w-[40%] !min-w-20 text-center line-clamp-2 !px-2 !py-0 !text-black dark:!text-white not-italic !text-sm sm:!text-base !break-words",
          sx?.extraProps?.className
        )}
      />
    </Card>
  );
}
