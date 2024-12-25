"use client";
import React, { useEffect, useRef } from "react";

type Props = {
  src?: string;
  type?: string;
};

export default function AnimeViewer({ src = "", type = "" }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (iframeRef.current) {
      console.log("Iframe Element:", iframeRef.current);
    }
  }, []);

  const sandboxAttributes =
    type.toLowerCase() === "anime"
      ? "allow-same-origin allow-scripts"
      : undefined;

  return (
    <div className="relative w-full pb-[56.25%] overflow-hidden bg-black">
      <iframe
        ref={iframeRef}
        src={src}
        allowFullScreen
        sandbox={sandboxAttributes}
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full"
        title="Embedded Video"
      ></iframe>
    </div>
  );
}
