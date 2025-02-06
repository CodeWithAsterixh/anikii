"use client";

import { setSideBarSize } from "@/store/reducers/sideBarReducer";
import { AppDispatch, RootState } from "@/store/store";
import {
  Button
} from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback } from "react";
import { AiFillHome } from "react-icons/ai";
import {
  BiSolidHomeAlt2,
  BiSolidMoviePlay,
  BiTrendingUp
} from "react-icons/bi";
import { BsCollectionFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

type Props = object;
type NavBarLinkProps = {
  path: string;
  text: string;
  icon?: React.ReactNode;
  title?: string;
  bgColor?:string;
};

function NavBarLink({ path, text, icon, title,bgColor }: NavBarLinkProps) {
  const { size } = useSelector((s: RootState) => s.sidebar);
  const pathUrl = usePathname();

  return (
    <Link href={path} className={"w-full"} title={title}>
      <Button
        className={clsx("w-full !rounded-md", {
          "!px-0 !py-3 *:!m-0 !min-w-fit": size === "small",
          "!py-2 !px-3": size === "full",
          "!bg-primary/50":path !== pathUrl&&!bgColor,
          "!border-l-2 !border-tertiary !bg-primary/70 !text-accent":
            path === pathUrl,
          "!text-accent":
            path !== pathUrl,
        })}
        style={{
          backgroundColor: bgColor
        }}
        startIcon={
          <i className="text-xl min-[498px]:text-2xl sm:text-3xl *:size-6">
            {icon ? icon : <AiFillHome />}
          </i>
        }
      >
        {size === "full" && (
          <strong className="size-full text-left text-base min-[498px]:text-lg">
            {text}
          </strong>
        )}
      </Button>
    </Link>
  );
}



function NavBar({}: Props) {
  const { size } = useSelector((s: RootState) => s.sidebar);
  const dispatch = useDispatch<AppDispatch>();
  //   sidebar toggler
  const handleToggleSideBarSize = useCallback(() => {
    if (size === "full") {
      dispatch(setSideBarSize("small"));
    } else {
      dispatch(setSideBarSize("full"));
    }
  }, [dispatch, size]);

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 isolate !z-10 sm:h-full duration-200 ",
        {
          "w-[70vw] sm:w-[40vw] max-w-[300px] min-w-fit h-full sm:p-1":
            size === "full",
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
      {
        size==="full"&&<section
        className={clsx(
          "w-full p-2 relative flex flex-col items-start justify-start gap-2 sm:min-w-fit sm:h-full bg-tertiary/90  backdrop-blur-2xl rounded-r-lg overflow-hidden",
          {
            "h-full min-w-[50vw]": size === "full",
          }
        )}
      >
        {/* topbar of the  sidebar */}
        <div
          className={clsx(
            "w-full p-2 border-b-4 border-b-accent  flex items-center gap-10",
            {
              "justify-between": size === "full",
            }
          )}
        >
          {size === "full" && (
            <h1 className="font-mono font-bold overflow-hidden text-lg min-[498px]:text-xl sm:text-2xl text-accent">
              Anikii
            </h1>
          )}
          
        </div>
        <nav
          className={clsx(
            "sm:flex h-full w-full flex-col items-start justify-start gap-3 rounded-md overflow-y-auto",
            {
              "p-2 flex": size === "full",
            }
          )}
        >
          <NavBarLink
            path="/"
            text="Home"
            title="Home - Anikii | See recent and popular animes"
            icon={<BiSolidHomeAlt2 />}
          />
          <NavBarLink
            path="/popular"
            icon={<BiTrendingUp />}
            text="Popular"
            title="Find popular anime"
          />
          <NavBarLink
            path="/categories"
            icon={<BsCollectionFill />}
            text="Categories"
            title="See categories of animes based on genres"
          />
          
          <NavBarLink
            path="/movies"
            icon={<BiSolidMoviePlay />}
            text="Anime Movies"
            title="Find anime movies"
          />
        </nav>

        
      </section>
      }
      
    </aside>
  );
}

export default NavBar;
