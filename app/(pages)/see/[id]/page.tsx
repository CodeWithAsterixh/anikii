"use client";

import AnimeDetailsSection from "@/ui/sections/popularSection/AnimeDetailsSection";
import PopularSection from "@/ui/sections/popularSection/PopularSection";
import { useParams } from "next/navigation";
type Props = object;

export default function AnimeDetails({}: Props) {
  const { id } = useParams();
  return (
    <div className="w-full h-fit">
      {typeof id === "string" && (
        <>
          <AnimeDetailsSection id={id} />
          <PopularSection
            heading={{
              done: "People are watching",
              loading: "Loading Popular anime",
              notFound: "No Popular anime available",
            }}
          />
        </>
      )}
    </div>
  );
}
