"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import { EPListProp, MoviePlayerEpCard } from "./EPISODED";
import clsx from "clsx";

const BASE_VIEW_WIDTH = 128;

function MovieEPSliider({
  episodes = [
    { episodeNumber: 1 },
    { episodeNumber: 2 },
    { episodeNumber: 3 },
    { episodeNumber: 4 },
  ],
}: EPListProp) {
  const epsScroller = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const updateMaxIndex = () => {
    setMaxIndex(Math.floor(window.innerWidth / BASE_VIEW_WIDTH));
  };

  useEffect(() => {
    updateMaxIndex();
    window.addEventListener("resize", updateMaxIndex);
    return () => window.removeEventListener("resize", updateMaxIndex);
  }, []);

  useEffect(() => {
    if (epsScroller.current) {
      epsScroller.current.scrollLeft = currentIndex * window.innerWidth;
    }
  }, [currentIndex]);

  const handleSlide = (direction: "back" | "forward") => {
    setCurrentIndex((prev) => {
      if (direction === "back") {
        return Math.max(prev - 1, 0);
      }
      return Math.min(prev + 1, maxIndex);
    });
  };

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

      {/* Navigation Buttons */}
      <div>
        {maxIndex > 1 && currentIndex > 0 && (
          <button
            className={clsx(
              "flex items-center justify-center p-2 text-lg min-[300px]:text-2xl sm:text-3xl rounded-r-md bg-black/70 absolute left-0 top-1/2 -translate-y-1/2"
            )}
            onClick={() => handleSlide("back")}
          >
            <CaretLeft />
          </button>
        )}

        {maxIndex > 1 && currentIndex < maxIndex && (
          <button
            className={clsx(
              "flex items-center justify-center p-2 text-lg min-[300px]:text-2xl sm:text-3xl rounded-l-md bg-black/70 absolute right-0 top-1/2 -translate-y-1/2"
            )}
            onClick={() => handleSlide("forward")}
          >
            <CaretRight />
          </button>
        )}
      </div>
    </section>
  );
}

export default MovieEPSliider;
