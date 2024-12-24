"use client";

import { Box, Chip, Skeleton } from "@mui/material";

export default function CarouselItemSkeleton() {
  return (
    <div className="w-full relative h-80 flex flex-col justify-end items-end text-white rounded-md isolate">
      {/* Background Skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        animation="wave"
        className="absolute inset-0 w-full h-full"
      />

      {/* Upper Gradient and Format Placeholder */}
      <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/50 to-transparent p-2">
        <Chip
          className="!bg-transparent !text-white !text-lg !font-bold"
          label={
            <Skeleton width={60} className="!bg-black/50 dark:!bg-white/50" />
          }
        />
      </div>

      {/* Lower Content */}
      <div className="w-full p-2 bg-gradient-to-t from-black/50 to-transparent">
        {/* Title Skeleton */}
        <Skeleton
          variant="text"
          width="80%"
          height={30}
          className="!mb-2 !rounded-md !bg-black/50 dark:!bg-white/50"
        />
        {/* Action Buttons */}
        <Box className="flex gap-2">
          <Skeleton
            variant="rectangular"
            width={120}
            height={40}
            className="!rounded-md !bg-black/50 dark:!bg-white/50"
          />
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            className="!rounded-md !bg-black/50 dark:!bg-white/50"
          />
        </Box>
      </div>
    </div>
  );
}
