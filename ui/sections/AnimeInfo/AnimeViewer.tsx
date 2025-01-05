"use client";
import { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  src?: string;
  type?: string;
};

export default function AnimeViewer({ src = "", type = "" }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setHasError(true);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setHasError(false);
    }
  }, [src]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const sandboxAttributes =
    type.toLowerCase() === "anime"
      ? "allow-same-origin allow-scripts"
      : undefined;

  if (hasError) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-black text-red-500">
        <p>Error: Unable to load the video. Please check the source URL.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-auto bg-black">
      {isLoading && (
        <div className="flex justify-center items-center h-[70vh]">
          <CircularProgress color="primary" />
        </div>
      )}
      <div
        className={`relative overflow-hidden mx-auto max-w-full max-h-[70vh] ${
          isLoading ? "hidden" : ""
        }`}
        style={{ aspectRatio: "16 / 9" }}
      >
        <iframe
          ref={iframeRef}
          src={src}
          allowFullScreen
          sandbox={sandboxAttributes}
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full"
          title="Embedded Video"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        ></iframe>
      </div>
    </div>
  );
}
