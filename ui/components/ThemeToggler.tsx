"use client";

import React from "react";
import clsx from "clsx";
import { Laptop, Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Tooltip } from "flowbite-react";
import { setTheme } from "@/state/reducers";

function ThemeToggler() {
  const { type } = useSelector(
    (state: RootState) => state.UserPreferences.themeMode
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ul
      className={clsx(
        "fixed w-fit p-0 border-2 border-base-black  rounded-md",
        "shadow-md shadow-neutral-500 dark:shadow-none",
        "bottom-5 right-5",
        "bg-neutral-500 dark:bg-neutral-300",
        "flex items-center justify-center divide-x-2 divide-neutral-300 dark:divide-neutral-500",
        "*:w-fit *:h-fit *:p-3 *:flex *:items-center *:justify-center",
        "*:text-lg *:text-base-white dark:*:text-base-black *:cursor-pointer"
      )}
    >
      <li
        onClick={() => dispatch(setTheme("dark"))}
        className={clsx(
          "hover:bg-neutral-400 hover:duration-200 hover:delay-100 rounded-l-md",
          {
            "duration-200 delay-100 bg-neutral-400": type == "dark",
          }
        )}
      >
        <Tooltip content={"Dark mode"} placement="top-start">
          <Moon className="w-full h-full" />
        </Tooltip>
      </li>
      <li
        onClick={() => dispatch(setTheme("auto"))}
        className={clsx(
          "hover:bg-neutral-400 hover:duration-200 hover:delay-100",
          {
            "duration-200 delay-100 bg-neutral-400": type == "system",
          }
        )}
      >
        <Tooltip content={"system theme"}>
          <Laptop className="w-full h-full" />
        </Tooltip>
      </li>
      <li
        onClick={() => dispatch(setTheme("light"))}
        className={clsx(
          "hover:bg-neutral-400 hover:duration-200 hover:delay-100 rounded-r-md",
          {
            "duration-200 delay-100 bg-neutral-400": type == "light",
          }
        )}
      >
        <Tooltip content={"Light mode"} placement="top-end">
          <Sun className="w-full h-full" />
        </Tooltip>
      </li>
    </ul>
  );
}

export default ThemeToggler;
