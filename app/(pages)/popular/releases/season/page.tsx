"use client";

import Pagination from "@/ui/components/pagination/Pagination";
import useSeasons from "@/ui/hooks/useSeasons";
import SeasonalSection from "@/ui/sections/popularSection/Seasonal";

type Props = object;

export default function Season({}: Props) {
  const { response } = useSeasons();
  return (
    <div className="w-full h-fit">
      <SeasonalSection />
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
