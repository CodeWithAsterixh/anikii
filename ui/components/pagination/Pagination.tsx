"use client";

import { RootState } from "@/store/store";
import { Pagination as PaginationComp } from "@mui/material";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";

type Props = {
  onChange?: (_: unknown, page: number) => void;
  page: number;
};

export default function Pagination({ onChange }: Props) {
  const { mode } = useSelector((s: RootState) => s.ThemePreference);

  return (
    <footer className="w-full flex items-center justify-center">
      <Suspense fallback={""}>
        <PaginationComp
          count={200}
          siblingCount={0}
          boundaryCount={2}
          onChange={onChange}
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
    </footer>
  );
}
