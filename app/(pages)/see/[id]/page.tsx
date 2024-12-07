"use client";

import AnimeRecommendationSection from "@/ui/sections/popularSection/AnimeRecommendationSection";
import AnimeDetailsSection from "@/ui/sections/popularSection/AnimeDetailsSection";
import { useParams } from "next/navigation";
type Props = object;

export default function AnimeDetails({}: Props) {
  const { id } = useParams();
  return (
    <div className="w-full h-fit">
      {typeof id === "string" && (
        <>
          <AnimeDetailsSection id={id} />
          <AnimeRecommendationSection id={id} />
        </>
      )}
    </div>
  );
}
