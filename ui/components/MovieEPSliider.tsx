"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useRef, useState } from "react";
import { EPListProp, MoviePlayerEpCard } from "./EPISODED";
import clsx from "clsx";

const __BASEMVEW__ = 128;

function MovieEPSliider({
  episodes = [
    { episodeNumber: 1 },
    { episodeNumber: 2 },
    { episodeNumber: 3 },
    { episodeNumber: 4 },
  ],
}: EPListProp) {
  const epsScroller = useRef<HTMLUListElement>(null);
  const [epsPositioning, setEpsPositioning] = useState({
    currentIndex: 0,
    maxIndex: 0,
  });
  useEffect(() => {
    if (epsScroller.current !== null) {
      setEpsPositioning((prev) => ({
        ...prev,
        maxIndex: Math.floor(window.innerWidth / __BASEMVEW__),
      }));
    }
  }, [epsScroller]);
  useEffect(() => {
    if (epsScroller.current !== null) {
      const pos = epsScroller.current;

      pos.scrollLeft = epsPositioning.currentIndex * window.innerWidth;
    }
  }, [epsPositioning.currentIndex]);

  function handleSlide(towards: "back" | "fort") {
    switch (towards) {
      case "back":
        setEpsPositioning((prev) => ({
          ...prev,
          currentIndex: prev.currentIndex !== 0 ? prev.currentIndex - 1 : 0,
        }));

        break;
      case "fort":
        setEpsPositioning((prev) => ({
          ...prev,
          currentIndex:
            prev.currentIndex !== prev.maxIndex
              ? prev.currentIndex + 1
              : prev.maxIndex,
        }));

        break;

      default:
        break;
    }
  }
  return (
    <section className="w-[calc(100%-(0.5rem*2))] h-fit relative mt-3 mx-2">
      <ul
        ref={epsScroller}
        className="w-full flex items-center justify-start overflow-auto gap-2 snap-mandatory snap-x duration-200"
      >
        {episodes &&
          episodes.map((ep, index) => (
            <MoviePlayerEpCard
              key={index}
              epnum={ep.episodeNumber}
              isPlaying={ep.isPlaying}
              episodeDesc={ep.episodeDesc}
            />
          ))}
      </ul>
      <div>
        {epsPositioning.maxIndex > 1 && epsPositioning.currentIndex >= 1 && (
          <button
            className={clsx(
              "flex items-center justify-center p-2 text-lg min-[300px]:text-2xl sm:text-3xl rounded-r-md",
              "bg-black/70",
              "absolute left-0 top-1/2 -translate-y-1/2"
            )}
            onClick={() => handleSlide("back")}
          >
            <CaretLeft />
          </button>
        )}

        {epsPositioning.maxIndex > 1 &&
          epsPositioning.maxIndex !== epsPositioning.currentIndex && (
            <button
              className={clsx(
                "flex items-center justify-center p-2 text-lg min-[300px]:text-2xl sm:text-3xl rounded-l-md",
                "bg-black/70",
                "absolute right-0 top-1/2 -translate-y-1/2"
              )}
              onClick={() => handleSlide("fort")}
            >
              <CaretRight />
            </button>
          )}
      </div>
    </section>
  );
}

export default MovieEPSliider;
