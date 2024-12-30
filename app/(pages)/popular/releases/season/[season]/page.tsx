"use client";

import { seasons } from "@/lib/types/__anikii_api";
import Pagination from "@/ui/components/pagination/Pagination";
import useSeasons from "@/ui/hooks/useSeasons";
import SeasonalSection from "@/ui/sections/popularSection/Seasonal";
import { useParams } from "next/navigation";

type Props = object;

export default function Seasons_SEASONS({}: Props) {
  
  const { season } = useParams<{season:seasons}>();
  const { response } = useSeasons();


  


  return (
    <div className="w-full h-fit">
          <SeasonalSection season={season}  />
          <Pagination
            page={
              response.pageInfo
                ? response.pageInfo
                : {
                    currentPage: 0,
                    lastPage: 0,
                  }
            }
          />
        </div>
  );
}
