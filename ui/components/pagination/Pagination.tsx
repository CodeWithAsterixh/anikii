"use client";

import { pageInfo } from "@/store/reducers/listReducer";
import { RootState } from "@/store/store";
import { Pagination as PaginationComp } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { Suspense, useCallback, useDeferredValue } from "react";
import { useSelector } from "react-redux";

type Props = {
  onChange?: (_: unknown, page: number) => void;
  page: pageInfo;
};

export default function Pagination({ onChange, page }: Props) {
  const { mode } = useSelector((s: RootState) => s.ThemePreference);
  const router = useRouter();
  const currentPage = useDeferredValue(page.currentPage);
  const handleNavPage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: unknown, page: number) => {
      if (onChange) {
        onChange(_, page);
        return;
      }
      router.push(`?page=${page}`);
    },
    [onChange, router]
  );

  return page.currentPage ? (
    <footer className="w-full flex items-center justify-center sticky bottom-5 pt-5">
      <div className="w-fit p-4 bg-base-black/30 dark:bg-base-white/30 backdrop-blur-lg rounded-full">
        <Suspense fallback={""}>
          <PaginationComp
            count={page.lastPage}
            siblingCount={0}
            page={currentPage}
            boundaryCount={2}
            onChange={handleNavPage}
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
        </Suspense>
      </div>
    </footer>
  ) : null;
}
