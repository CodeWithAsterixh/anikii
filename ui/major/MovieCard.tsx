"use client";

import clsx from "clsx";

import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  isList?: boolean;
  image?: string;
  title?: string;
  rate?: number;
  id?: string | number;
};

function MovieCard({ isList, image, title, rate, id }: Props) {
  const router = useRouter();
  const navigate = router.push;
  function handleOpen() {
    navigate(`/anime?anime_id=${id}`);
  }
  const imageComp = image && (
    <img
      className="size-full object-cover object-center"
      src={image}
      alt={title ? title : ""}
      width={500}
      height={500}
   
     loading="lazy"
    />
  );
  const titleComp = title ? title.split("(Dub)")[0].trimEnd() : "";
  const dubSub = title && title.includes("(Dub)") ? "Dub" : "Sub";
  const rating = rate && (
    <li className="bg-secondary">#{Math.ceil((rate / 100) * 10)}</li>
  );

  return isList ? (
    <li
      className={clsx(
        "w-36 h-48 flex items-start justify-start flex-col",
        "flex-grow basis-32 max-w-[300px] sm:max-w-40",
        "rounded-md overflow-hidden"
      )}
      onClick={handleOpen}
    >
      <div className="w-full h-[75%] bg-slate-500 relative flex items-end">
        <span className="flex items-center justify-center size-full absolute z-0 inset-0 bg-gray-500">
          {imageComp}
        </span>
        <ul
          className={clsx(
            "w-full flex items-end justify-between relative bg-gradient-to-t from-black/50 to-base-white/0",
            "*:p-1 *:px-2 *:rounded-md *:text-xs p-1"
          )}
        >
          {rating}

          <li className="bg-base-white text-base-black">{dubSub}</li>
        </ul>
      </div>
      <div className="w-full h-[25%] overflow-hidden bg-slate-700 p-1">
        <p className="line-clamp-2">{titleComp}</p>
      </div>
    </li>
  ) : (
    <div
      className={clsx(
        "w-36 h-48 flex items-start justify-start flex-col",
        "flex-grow basis-32 max-w-[300px] sm:max-w-40",
        "rounded-md overflow-hidden"
      )}
      onClick={handleOpen}
    >
      <div className="w-full h-[75%] bg-slate-500 relative flex items-end">
        <span className="flex items-center justify-center size-full absolute z-0 inset-0 bg-gray-500">
          {imageComp}
        </span>
        <ul
          className={clsx(
            "w-full flex items-end justify-between relative bg-gradient-to-t from-black/50 to-base-white/0",
            "*:p-1 *:px-2 *:rounded-md *:text-xs p-1"
          )}
        >
          {rating}

          <li className="bg-base-white text-base-black">{dubSub}</li>
        </ul>
      </div>
      <div className="w-full h-[25%] overflow-hidden bg-slate-700 p-1">
        <p className="line-clamp-2">{titleComp}</p>
      </div>
    </div>
  );
}

export default MovieCard;
