"use client";

import { setSideBarSize } from "@/store/reducers/sideBarReducer";
import { setTheme } from "@/store/reducers/themeReducer";
import { AppDispatch, RootState } from "@/store/store";
import { Button } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback } from "react";
import { AiFillHome } from "react-icons/ai";
import { BiHomeAlt, BiMoviePlay, BiTrendingUp } from "react-icons/bi";
import { BsClockHistory, BsMoon, BsSun } from "react-icons/bs";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

type Props = object;
type NavBarLinkProps = {
  path: string;
  text: string;
  icon?: React.ReactNode;
  title?: string;
};

function NavBarLink({ path, text, icon, title }: NavBarLinkProps) {
  const { size } = useSelector((s: RootState) => s.sidebar);
  const pathUrl = usePathname();

  return (
    <Link href={path} className={"w-full"} title={title}>
      <Button
        className={clsx("w-full  ", {
          "!px-0 !py-3 *:!m-0 !min-w-fit": size === "small",
          "!py-2 !px-3": size === "full",
          "!bg-black/70 dark:!bg-white/70 !text-base-white dark:!text-black":
            path === pathUrl,
          "!bg-black/20 dark:!bg-white/20 !text-base-black dark:!text-white":
            path !== pathUrl,
        })}
        startIcon={
          <i className="text-sm min-[498px]:text-lg sm:text-xl">
            {icon ? icon : <AiFillHome />}
          </i>
        }
      >
        {size === "full" && (
          <strong className="size-full text-left text-sm min-[498px]:text-lg">
            {text}
          </strong>
        )}
      </Button>
    </Link>
  );
}
function NavBar({}: Props) {
  const { size } = useSelector((s: RootState) => s.sidebar);
  const { mode } = useSelector((s: RootState) => s.ThemePreference);
  const dispatch = useDispatch<AppDispatch>();
  //   sidebar toggler
  const handleToggleSideBarSize = useCallback(() => {
    if (size === "full") {
      dispatch(setSideBarSize("small"));
    } else {
      dispatch(setSideBarSize("full"));
    }
  }, [dispatch, size]);
  const handleToggleTheme = useCallback(() => {
    if (mode === "dark") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
  }, [dispatch, mode]);
  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 sm:relative isolate !z-10 sm:h-full duration-200 ",
        {
          "w-[40vw] max-w-[300px] min-w-fit h-full sm:p-1": size === "full",
          "w-16 h-fit  py-[7px] sm:p-1": size === "small",
        }
      )}
    >
      {size === "full" && (
        <div
          onClick={handleToggleSideBarSize}
          className="fixed w-screen h-screen inset-0 -z-10 bg-black/30 sm:hidden"
        />
      )}
      {/* sidebar content */}
      <section
        className={clsx(
          "w-full p-2 relative flex flex-col items-start justify-start gap-2 min-w-fit sm:h-full bg-base-white dark:bg-base-black backdrop-blur-md rounded-lg overflow-hidden",
          {
            "h-fit": size === "small",
            "h-full": size === "full",
          }
        )}
      >
        {/* topbar of the  sidebar */}
        <div
          className={clsx(
            "w-full p-2 sm:border-b-4 border-b-black/20 dark:border-b-white/20 flex items-center gap-10",
            {
              "justify-center": size === "small",
              "justify-between": size === "full",
            }
          )}
        >
          {size === "full" && (
            <h1 className="font-mono overflow-hidden text-lg min-[498px]:text-xl sm:text-2xl text-black dark:text-white">
              Anikii
            </h1>
          )}
          <button
            onClick={handleToggleSideBarSize}
            className="text-lg min-[498px]:text-xl sm:text-3xl text-black dark:text-white"
          >
            {size === "full" ? <GoSidebarExpand /> : <GoSidebarCollapse />}
          </button>
        </div>
        <nav
          className={clsx(
            "sm:flex w-full flex-col items-start justify-start gap-3",
            {
              "p-0 hidden": size === "small",
              "p-2 flex": size === "full",
            }
          )}
        >
          <NavBarLink
            path="/"
            text="Home"
            title="Home - Anikii | See recent and popular animes"
            icon={<BiHomeAlt />}
          />
          <NavBarLink
            path="/popular"
            icon={<BiTrendingUp />}
            text="Popular"
            title="See popular animes"
          />
          <NavBarLink
            path="/new-releases"
            icon={<BsClockHistory />}
            text="Recent Releases"
            title="See Recent releases"
          />
          <NavBarLink
            path="/movies"
            icon={<BiMoviePlay />}
            text="Anime Movies"
            title="Find anime movies"
          />
        </nav>

        {/* theme changer */}
        <div
          className={clsx(
            "sm:flex absolute bottom-0 left-1/2 w-[calc(100%-0.5rem)] p-2 -translate-x-1/2 flex-col items-start justify-start gap-3",
            {
              "w-[calc(100%-0.25rem)] p-1 hidden": size === "small",
              "w-[calc(100%-0.5rem)] p-2 flex": size === "full",
            }
          )}
        >
          <Button
            className={clsx(
              "w-full !bg-black/20 dark:!bg-white/20 !text-base-black dark:!text-white",
              {
                "!px-0 !py-3 *:!m-0 !min-w-fit": size === "small",
                "!p-2": size === "full",
              }
            )}
            startIcon={
              <i className="text-sm min-[498px]:text-lg sm:text-xl">
                {mode === "dark" ? <BsMoon /> : <BsSun />}
              </i>
            }
            onClick={handleToggleTheme}
          >
            {size === "full" && (
              <strong className="size-full text-left text-sm min-[498px]:text-lg">
                {mode === "dark" ? "Light" : "Dark"} Theme
              </strong>
            )}
          </Button>
        </div>
      </section>
    </aside>
  );
}

export default NavBar;
