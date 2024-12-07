"use client";

import SearchResultsSection from "@/ui/sections/popularSection/SearchResultSection";
import { useSearchParams } from "next/navigation";
type Props = object;

export default function Search({}: Props) {
  const params = useSearchParams();
  const keyword = params.get("for");

  return (
    <div className="w-full h-fit">
      <SearchResultsSection keyWord={keyword ? keyword : undefined} />
    </div>
  );
}
