"use client";

import { Episode } from "@/lib/types/__anikii_api";
import { RootState } from "@/store/store";
import Image from "@/ui/components/Image/Image";
import { Pagination } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

export const EpisodeSection = ({
  totalEpisodes,
  episodes,
}: {
  totalEpisodes: number;
  episodes: Episode[];
}) => {
  const { mode } = useSelector((s: RootState) => s.ThemePreference);

  // Define the number of episodes per page
  const episodesPerPage = 20;

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalEpisodes / episodesPerPage);

  // Get the current range of episodes for the page
  const currentEpisodes = episodes.slice(
    (currentPage - 1) * episodesPerPage,
    currentPage * episodesPerPage
  );

  return (
    <div className="flex-1 min-w-[250px] p-4 bg-base-white dark:bg-base-black rounded-lg shadow-md">
      <h6 className="text-gray-700 dark:text-gray-300 font-bold">
        Total Episodes ({totalEpisodes})
      </h6>

      {/* Episodes Grid */}
      <div className="gap-4 mt-4 grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))]">
        {currentEpisodes.map((episode, idx) => (
          <Link
            key={idx}
            href={episode.url}
            className="w-full block bg-white dark:bg-base-black rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
          >
            <Image
              src={episode.imageUrl}
              alt={episode.title}
              className="w-full h-28 object-cover"
            />
            <div className="p-4">
              <h4 className="text-gray-700 dark:text-gray-300 font-semibold">
                Ep{" "}
                {
                  episode.title.toLowerCase().split("episode")[
                    episode.title.toLowerCase().split("episode").length - 1
                  ]
                }
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Released: {new Date(episode.releaseDate).toDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <section className="w-full flex items-center justify-center pt-7 py-3">
        <Pagination
          count={totalPages}
          page={currentPage}
          siblingCount={0}
          boundaryCount={2}
          onChange={(_, page) => setCurrentPage(page)}
          className="!text-black dark:!text-white"
          sx={{
            "& .MuiPaginationItem-root": {
              color: mode === "light" ? "black" : "white",
              "&:hover": {
                color: mode === "light" ? "black" : "white",
              },
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              color: mode === "light" ? "white" : "black",
              backgroundColor: mode === "light" ? "black" : "white",
              "&:hover": {
                backgroundColor: mode === "light" ? "black" : "white",
              },
            },
          }}
        />
      </section>
    </div>
  );
};
