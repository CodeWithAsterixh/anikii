"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import Search from "../Search";
import { glassMorphism } from "../styles/style";
import { useState } from "react";

type HeaderProps = {
  showSearch?: boolean;
};

const Header = ({ showSearch = true }: HeaderProps) => {
  const router = useRouter();
  const navigate = router.push;

  // For handling mobile dropdown navigation menu
  const [dropped, setDropped] = useState(false);

  const toggleDropdown = () => setDropped(!dropped);

  return (
    <header
      className={clsx(
        glassMorphism.className,
        glassMorphism.dark,
        "p-3 w-full h-fit sticky top-0 border-b-[1px]",
        "flex items-center justify-between gap-2 flex-col min-[300px]:flex-row z-10"
      )}
    >
      <h1 className="text-secondary font-extrabold m-0 text-base sm:text-xl">
        <span className="text-primary brightness-75 dark:brightness-125">
          ANI
        </span>
        KII
      </h1>

      <nav className="flex items-center justify-start gap-1">
        <ul className="w-fit sm:flex gap-2 text-black dark:text-white">
          {showSearch && (
            <li>
              <Search
                onSearch={(term) => navigate(`/searchfor?term=${term}`)}
                placeholder="Search anime"
              />
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile dropdown toggle */}
      <aside className="w-fit h-fit sm:hidden">
        <span
          onClick={toggleDropdown}
          className={clsx(
            "w-7 h-5 relative flex flex-col items-center justify-center",
            "before:content-[''] after:content-['']",
            "before:absolute before:left-0 after:absolute after:left-0",
            "before:w-full after:w-full",
            "before:h-[25%] after:h-[25%]",
            "before:bg-base-black/70 after:bg-base-black/70",
            "dark:before:bg-base-white/70 dark:after:bg-base-white/70",
            "before:rounded-md after:rounded-md",
            "before:duration-500 after:duration-500",
            {
              "before:bottom-0 after:top-0": !dropped,
              "before:top-1/2 after:top-1/2": dropped,
              "before:rotate-45 after:-rotate-45": dropped,
              "-rotate-[90deg] duration-1000": dropped,
              "rotate-[0deg] duration-1000": !dropped,
              "before:-translate-y-1/2 after:-translate-y-1/2": dropped,
            }
          )}
          aria-label="Toggle navigation"
        >
          <i
            className={clsx(
              "w-full h-[25%] rounded-md bg-base-black/70 dark:bg-base-white/70 duration-500 delay-200",
              {
                "translate-x-[50%] opacity-0": dropped,
                "translate-x-0 opacity-1": !dropped,
              }
            )}
          ></i>
        </span>

        <ul
          className={clsx(
            "w-full min-[320px]:w-56 h-fit p-2 flex flex-col items-center justify-center gap-2",
            "bg-neutral-500 rounded-md",
            "border-2 border-base-white/50",
            "absolute z-10 right-0 top-[calc(100%+2px)]",
            {
              "animate-slide-down-simple": dropped,
              "animate-slide-up-simple pointer-events-none": !dropped,
            },
            "text-base-white dark:text-base-white"
          )}
        >
          <li
            onClick={() => {
              toggleDropdown();
              navigate("#", { scroll: true });
            }}
            className="w-full h-fit p-2 rounded-r-md cursor-pointer"
          >
            Home
          </li>
        </ul>
      </aside>
    </header>
  );
};

export default Header;
