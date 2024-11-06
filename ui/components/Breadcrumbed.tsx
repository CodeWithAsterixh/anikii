"use client";
import { House } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { usePathname } from "next/navigation";
import React from "react";

type Props = object;

function BreadCrumbed({}: Props) {
  const pathName = usePathname();
  const paths = pathName.split("/").map((path) => ({
    name: path !== "" ? path : "Home",
    path: `/` + path,
  }));

  return (
    <Breadcrumb className="w-full h-fit p-3 backdrop-blur-md shadow-lg bg-base-white/75 dark:bg-base-black/75 sticky top-0 z-[2] overflow-x-auto">
      {paths.map(({ name, path }, index) => (
        <BreadcrumbItem
          key={index}
          href={index !== paths.length - 1 ? path : undefined}
          className={clsx(
            index !== paths.length - 1
              ? "*:text-base-black/70 dark:*:text-base-white/70"
              : "*:text-base-black dark:*:text-base-white",
            index !== paths.length - 1 &&
              "*:hover:text-base-black dark:*:hover:text-base-white"
          )}
        >
          <div className="w-fit capitalize flex gap-2 items-center justify-start text-base">
            {name == "Home" && <House weight="fill" className="-mt-1" />}
            {decodeURI(name)}
          </div>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export default BreadCrumbed;
