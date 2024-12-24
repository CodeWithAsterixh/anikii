import React from "react";
import { AnimeGridSkeleton } from "./AnimeGrid";
import { Button } from "@mui/material";
import { AnimeListSkeleton } from "./AnimeList";
import clsx from "clsx";

type Props = {
  variant?: "scroll" | "grid";
  reloader: () => void;
  children?:React.ReactNode;
  className?:string;
};

export default function AnimeListReloader({ variant, reloader,children,className }: Props) {
  return (
    <>
    <div className={clsx(
      "w-full",
      !variant ?"absolute inset-0 h-full z-10" :"h-fit relative",
      className
    )}>
      {variant && (variant === "grid" ? <AnimeGridSkeleton /> : <AnimeListSkeleton />)}
      <span className="size-fit p-4 bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute inset-0 flex items-center justify-center">
        <Button
          variant="outlined"
          onClick={reloader}
          className="!bg-fade-white dark:!bg-fade-black !text-black dark:!text-white"
        >
          Reload
        </Button>
      </span>
    </div>
    {children}
    </>
  );
}
