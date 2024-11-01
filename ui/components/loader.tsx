import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import React from "react";

function Loader({className}:{className?: string}) {
  return (
    <div className={
      clsx(
        "flex size-full p-5 text-base-black dark:text-base-white box-border items-center justify-center relative",
        className
      )
    }>
      <CircleNotch weight="bold" size={25} className="text-5xl animate-spin" />
    </div>
  );
}

export default Loader;
