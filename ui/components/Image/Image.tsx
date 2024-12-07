/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import React, { useState } from "react";
import NextImage from "next/image";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string; // Image source is required
  fallback?: React.ReactNode; // Fallback content (e.g., icon or placeholder)
  siblings?: React.ReactNode;
  width?: number;
  height?: number;
}

const Image: React.FC<ImageProps> = ({
  src,
  fallback,
  siblings,
  alt,
  ...imgProps
}) => {
  const [mediaThumbnailError, setMediaThumbnailError] = useState(false);

  return mediaThumbnailError ? (
    fallback
  ) : (
    <>
      <NextImage
        src={`${src ? src : ""}`} // Use the resolved imageSrc or empty string as fallback
        {...imgProps} // Spread the remaining props for the <img> element
        onError={() => {
          setMediaThumbnailError(true);
        }}
        width={imgProps.width ? imgProps.width : 200}
        height={imgProps.height ? imgProps.height : 200}
        loading="lazy"
        alt={alt ? alt : "image"}
        className={clsx("object-cover object-center", imgProps.className)}
      />
      {siblings}
    </>
  );
};

export default Image;
