import clsx from "clsx";
import React from "react";

export default function ENDOFLINE({className,text="ENDOFLINE"}:{className?:string, text?:string}) {
  return (
    <span
      className={clsx(
        "w-full flex items-center justify-center opacity-50 px-5 gap-2",
        "before:content-[''] after:content-['']",
        "before:w-full after:w-full",
        "before:h-0.5 after:h-0.5",
        "before:relative after:relative",
        "before:bg-tertiary/30 after:bg-tertiary/30",
        "before:rounded-full after:rounded-full",
        "text-tertiary/30",
        className
      )}
    >
      <b className="shrink-0">{text}</b>
    </span>
  );
}
