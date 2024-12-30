"use client";

import { seasons } from "@/lib/types/__anikii_api";
import Pagination from "@/ui/components/pagination/Pagination";
import useSeasons from "@/ui/hooks/useSeasons";
import SeasonalSection from "@/ui/sections/popularSection/Seasonal";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = object;

export default function Seasons_SEASONS({}: Props) {
  
  const { year,season } = useParams<{season:seasons,year?:string|string[]}>();
  const { response } = useSeasons();

  const [yearNum, setYearNum] = useState<number>();
  
    useEffect(() => {
      if (typeof year === "string") {
        const yearInNum = parseInt(year);
        if (!isNaN(yearInNum)) {
          setYearNum(yearInNum);
        }
      }
    }, [year]);
  


  return (
    <div className="w-full h-fit">
          <SeasonalSection season={season} year={yearNum} />
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
