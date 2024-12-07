"use client";

import { RootState } from "@/store/store";
import { AppBar } from "@mui/material";
import { useSelector } from "react-redux";
import SearchBtn from "../SearchBtn/SearchBtn";
import clsx from "clsx";
import { buildSearchUrl, searchFilters } from "@/lib/mods/middlewares/search";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

type Props = object;

export default function MainHeader({}: Props) {
  const { size } = useSelector((s: RootState) => s.sidebar);
  const router = useRouter();
  const handleSearch = useCallback(
    (filters: searchFilters) => {
      const url = buildSearchUrl(filters);
      router.push(url);
    },
    [router]
  );

  return (
    <AppBar
      position="sticky"
      className={clsx(
        "!w-full !h-16 !pl-[4rem] sm:!pl-2 !pr-2 !top-0 !bg-base-white dark:!bg-base-black !flex !gap-4 !flex-row !items-center !shadow-black/5",
        {
          "!justify-end": size === "full",
          "!justify-between": size === "small",
        }
      )}
    >
      {size === "small" && (
        <h1 className="font-mono overflow-hidden text-lg min-[498px]:text-xl sm:text-2xl text-black dark:text-white">
          Anikii
        </h1>
      )}
      <SearchBtn onSearch={(keyWord) => handleSearch({ keyWord })} />
    </AppBar>
  );
}
