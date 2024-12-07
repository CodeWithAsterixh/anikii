"use client";

import { RootState } from "@/store/store";
import { Button, Pagination } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

export const EpisodeSection = ({
  totalEpisodes,
  id,
}: {
  totalEpisodes: number;
  id: string;
}) => {
  const { mode } = useSelector((s: RootState) => s.ThemePreference);

  // Define the number of episodes per page (range)
  const episodesPerRange = 20;

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages (ranges)
  const totalPages = Math.ceil(totalEpisodes / episodesPerRange);

  // Calculate the start and end episode numbers based on the current page
  const start = (currentPage - 1) * episodesPerRange + 1;
  const end = Math.min(currentPage * episodesPerRange, totalEpisodes);

  return (
    <div className="flex-1 min-w-[250px] p-4 bg-base-white dark:bg-base-black rounded-lg shadow-md">
      <h6 className="text-gray-700 dark:text-gray-300 font-bold">
        Total Episodes ({totalEpisodes})
      </h6>

      {/* Display episodes in the current range */}
      <div className="gap-2 mt-4 grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))]">
        {Array.from({ length: end - start + 1 }, (_, idx) => start + idx).map(
          (ep) => (
            <Link
              key={ep}
              href={`/stream/${id}-episode-${ep}`}
              className="w-full"
            >
              <Button className="!text-gray-600 dark:!text-gray-200 !bg-neutral-300 dark:!bg-neutral-600 transition-colors py-1 px-3 rounded-md">
                EP | {ep}
              </Button>
            </Link>
          )
        )}
      </div>

      {/* Display current page and total pages */}
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
