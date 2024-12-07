import { GroupedResult } from "@/lib/mods/functions/groupAnimeArrayByTitle";
import React from "react";
import AnimeGrouper from "./AnimeGrouper";
import AnimeList, { AnimeListSkeleton } from "./AnimeList";
import AnimeGrid, { AnimeGridSkeleton } from "./AnimeGrid";
import { process } from "@/lib/types/__anikii_api";

type Props = {
  groupedData?: GroupedResult;
  keyWord?: string;
  loading?: process;
};

const AnimeCategoryGrouper: React.FC<Props> = ({
  groupedData,
  keyWord,
  loading,
}) => {
  // Check if groupedData is an array (only "others" category exists)
  if (Array.isArray(groupedData)) {
    return (
      <AnimeGrouper
        header={
          groupedData && loading === "done"
            ? `${groupedData.length} anime ${
                keyWord ? `matches "${keyWord}"` : "found"
              }`
            : `Searching ${keyWord ? `for "${keyWord}"` : "..."}`
        }
        sxClasses={{
          navContainerClass: "!px-0",
        }}
      >
        {groupedData && groupedData.length > 0 ? (
          <AnimeGrid animes={groupedData} />
        ) : (
          <AnimeGridSkeleton />
        )}
      </AnimeGrouper>
    );
  }

  // Render grouped data as multiple categories
  return (
    <>
      <AnimeGrouper
        header={
          groupedData && loading === "done"
            ? `${Object.values(groupedData).reduce(
                (total, items) => total + items.length,
                0
              )} anime ${keyWord ? `matches "${keyWord}"` : "found"}`
            : `Searching ${keyWord ? `for "${keyWord}"` : "..."}`
        } // Capitalize the category name
        sxClasses={{
          containerClass: "!px-2",
          navContainerClass: "!px-0",
        }}
      >
        {groupedData ? (
          Object.entries(groupedData).map(([key, items]) => (
            <AnimeGrouper
              key={key}
              header={`${key.charAt(0).toUpperCase() + key.slice(1)} (${
                items.length
              } animes)`} // Capitalize the category name
              sxClasses={{
                containerClass:
                  "!px-2 !bg-base-white/30 dark:!bg-base-black/30 !backdrop-blur-md !rounded-md",
                navContainerClass: "!px-0",
              }}
            >
              {items.length > 0 ? (
                <AnimeList animes={items} />
              ) : (
                <AnimeListSkeleton />
              )}
            </AnimeGrouper>
          ))
        ) : (
          <AnimeListSkeleton />
        )}
      </AnimeGrouper>
    </>
  );
};

export default AnimeCategoryGrouper;
