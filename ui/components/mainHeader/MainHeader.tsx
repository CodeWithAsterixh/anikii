"use client";

import { RootState } from "@/store/store";
import { AppBar, Breadcrumbs, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SearchBtn from "../SearchBtn/SearchBtn";
import clsx from "clsx";
import { buildSearchUrl, searchFilters } from "@/lib/mods/middlewares/search";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type Props = object;

export default function MainHeader({}: Props) {
  const { size } = useSelector((s: RootState) => s.sidebar);
  const router = useRouter();
  const pathUrl = usePathname();
  const [paths, setPaths] = useState<string[]>([]);
  const handleSearch = useCallback(
    (filters: searchFilters) => {
      const url = buildSearchUrl(filters);
      router.push(url);
    },
    [router]
  );
  useEffect(() => {
    const paths = pathUrl.split("/").filter((p) => p !== "");
    setPaths(paths);
  }, [pathUrl]);
  useEffect(() => {
    const paths = pathUrl.split("/").filter((p) => p !== "");
    setPaths(paths);
  }, [pathUrl]);

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
        <h1 className="font-mono overflow-hidden text-lg min-[498px]:!text-xl sm:!text-2xl">
          {
            <Breadcrumbs className="!text-black/70 dark:!text-white/70 *:!max-h-[calc(1.5rem_*_2)] sm:*:!max-h-[calc(2.2rem_*_2)] overflow-hidden" aria-label="breadcrumb">
              <Link href="/" className="!text-black/70 dark:!text-white/70">
                Anikii
              </Link>
              {paths.length>0&&paths
                .slice(0, paths.length > 2 ? paths.length - 2 : 1)
                .map((path, ind) => (
                  <Link
                    key={ind}
                    className="!text-black/70 dark:!text-white/70"
                    href={`/${paths.slice(0, (ind+1)).join("/")}`}
                  >
                    {path}
                  </Link>
                ))}
              {paths.length>0&&<Typography
                sx={{ color: "text.primary" }}
                className="!text-black dark:!text-white"
              >
                {paths[paths.length - 1]}
              </Typography>}
            </Breadcrumbs>
          }
        </h1>
      )}
      <SearchBtn onSearch={(keyWord) => handleSearch({ keyWord })} />
    </AppBar>
  );
}
