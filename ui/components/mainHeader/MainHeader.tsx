"use client";

import { useIsMobile } from "@/hooks/useMobile";
import { buildSearchUrl, searchFilters } from "@/lib/mods/middlewares/search";
import { AppBar } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { BsMenuApp } from "react-icons/bs";
import SearchBtn from "../SearchBtn/SearchBtn";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setSideBarSize } from "@/store/reducers/sideBarReducer";

type Props = object;

export default function MainHeader({}: Props) {
  const isMobile = useIsMobile()
  const router = useRouter();
  const path = usePathname()
  const dispatch = useDispatch<AppDispatch>()
  const handleSearch = useCallback(
    (filters: searchFilters) => {
      const url = buildSearchUrl(filters);
      router.push(url);
    },
    [router]
  );

  const handleSideBarShow = ()=>{
    dispatch(setSideBarSize("full"))
  }


  return (
    <AppBar
      position="sticky"
      className={clsx(
        "!w-full !h-16 !px-6 !pr-2 !top-0 !bg-secondary  !gap-2 sm:!gap-4 !flex !flex-row  !items-center !justify-between !shadow-black/5"
      )}
    >
      <h1 className="font-mono overflow-hidden text-white font-bold text-lg sm:text-xl shrink-0">
          <Link href="/" className="">
                Anikii
              </Link>
        </h1>
      {/* navigation for large screen */}
      {
        !isMobile&&<nav className="w-fit capitalize font-bold text-sm hidden sm:flex sm:text-base items-center gap-4">
        <Link href="/popular" className={clsx("text-white delay-100 duration-300",{
          "text-secondary bg-tertiary px-3 py-1 rounded-full": path.includes("/popular")
        })}>popular</Link>
        <Link href="/movies" className={clsx("text-white delay-100 duration-300",{
          "text-secondary bg-tertiary px-3 py-1 rounded-full": path.includes("/movies")
        })}>movies</Link>
        <Link href="/categories" className={clsx("text-white delay-100 duration-300",{
          "text-secondary bg-tertiary px-3 py-1 rounded-full": path.includes("/categories")
        })}>Categories</Link>
      </nav>
      }
      
      <div className={clsx("flex items-center justify-end gap-2 max-w-[80vw]",isMobile?"w-full":"w-fit")}><SearchBtn onSearch={(keyWord) => handleSearch({ keyWord })} />
      {isMobile&&<button onClick={handleSideBarShow} className="size-10 rounded-md active:scale-95 duration-300 bg-tertiary flex items-center justify-center"><BsMenuApp className="size-[70%]"/></button>}</div>
    </AppBar>
  );
}
