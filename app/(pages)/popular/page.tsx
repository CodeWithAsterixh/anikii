"use client";

import { RootState } from "@/store/store";
import PopularSection from "@/ui/sections/popularSection/PopularSection";
import { Pagination } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useSelector } from "react-redux";

type Props = object;

export default function Popular({}: Props) {
  const params = useSearchParams();
  const page = params.get("page");
  const router = useRouter();
  const { mode } = useSelector((s: RootState) => s.ThemePreference);

  const handleNavigatePage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: unknown, page: number) => {
      router.push(`?page=${page}`);
    },
    [router]
  );

  return (
    <div className="w-full h-fit pb-10">
      <PopularSection
        page={page && !isNaN(parseInt(page)) ? parseInt(page) : 1}
      />
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
      </footer>
    </div>
  );
}
