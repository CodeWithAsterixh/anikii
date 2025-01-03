// AnimeInfoStreamLoader.tsx
import React from "react";
import { Skeleton, Box } from "@mui/material";
import { responseStatus } from "@/store/reducers/listReducer";

const AnimeInfoStreamLoader: React.FC<{status:responseStatus, reloader:React.ReactNode}> = ({status,reloader}) => {
  return (
    <Box className="!p-4 !bg-white dark:!bg-black !shadow-lg !isolate !text-white !relative">
        {/* reloader */}
        {status==="error"&&reloader}
      {/* Loader for Title */}
      <Skeleton
        variant="text"
        height={40}
        width="60%"
        className="!bg-black/20 dark:!bg-white/20"
        animation="wave"
      />

      {/* Loader for Episodes Section */}
      <Box className="!mt-4 !space-y-4">
        <Skeleton variant="text" height={30} width="40%" className="!bg-black/20 dark:!bg-white/20" />
        <Box className="!flex !items-center !justify-between">
          <Skeleton
            variant="rectangular"
            width={100}
            height={80}
            className="!rounded !bg-black/10 dark:!bg-white/10"
          />
          <Skeleton
            variant="text"
            height={20}
            width="50%"
            className="!bg-black/20 dark:!bg-white/20"
          />
        </Box>
      </Box>

      {/* Loader for Sub Episodes Section */}
      <Box className="!mt-6 !space-y-4">
        <Skeleton variant="text" height={30} width="50%" className="!bg-black/20 dark:!bg-white/20" />
        <Box className="!flex !flex-wrap !gap-2">
          {[...Array(4)].map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rectangular"
              width={80}
              height={30}
              className="!rounded !bg-black/10 dark:!bg-white/10"
            />
          ))}
        </Box>
      </Box>

      {/* Loader for Dub Episodes Section */}
      <Box className="!mt-6 !space-y-4">
        <Skeleton variant="text" height={30} width="50%" className="!bg-black/20 dark:!bg-white/20" />
        <Box className="!flex !flex-wrap !gap-2">
          {[...Array(4)].map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rectangular"
              width={80}
              height={30}
              className="!rounded !bg-black/10 dark:!bg-white/10"
            />
          ))}
        </Box>
      </Box>

      {/* Loader for External Links */}
      <Box className="!mt-6 !space-y-2">
        <Skeleton variant="text" height={30} width="40%" className="!bg-black/20 dark:!bg-white/20" />
        {[...Array(3)].map((_, idx) => (
          <Skeleton
            key={idx}
            variant="text"
            height={20}
            width="70%"
            className="!bg-black/20 dark:!bg-white/20"
          />
        ))}
      </Box>
    </Box>
  );
};

export default AnimeInfoStreamLoader;
