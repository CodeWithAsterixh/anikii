"use client";

import NewRelease from "@/ui/sections/popularSection/NewRelease";
import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = object;

export default function NewReleases({}: Props) {
  const params = useSearchParams();
  const page = params.get("page");
  const router = useRouter();

  const handleNavigatePage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: unknown, page: number) => {
      router.push(`?page=${page}`);
    },
    [router]
  );
  return (
    <div className="w-full h-fit  pb-10">
      <NewRelease page={page && !isNaN(parseInt(page)) ? parseInt(page) : 1} />
      <footer className="w-full flex items-center justify-center">
        <Pagination
          count={200}
          page={page && !isNaN(parseInt(page)) ? parseInt(page) : 1}
          siblingCount={0}
          boundaryCount={2}
          onChange={handleNavigatePage}
          className="!text-black dark:!text-white"
          sx={{
            "& .MuiPaginationItem-root": {
              // Base styles for pagination items
              "@apply text-black dark:text-white": {},
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              // Styles for the selected pagination item
              "@apply bg-black text-white dark:bg-white dark:text-black": {},
            },
            "& .MuiPaginationItem-root:hover": {
              // Hover styles for pagination items
              "@apply text-black dark:text-white": {},
            },
            "& .MuiPaginationItem-root.Mui-selected:hover": {
              // Hover styles for selected pagination items
              "@apply bg-black dark:bg-white": {},
            },
          }}
        />
      </footer>
    </div>
  );
}
