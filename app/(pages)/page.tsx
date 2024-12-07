"use client";

import NewRelease from "@/ui/sections/popularSection/NewRelease";
import PopularSection from "@/ui/sections/popularSection/PopularSection";

type Props = object;

export default function Home({}: Props) {
  return (
    <div className="w-full h-fit">
      <PopularSection />
      <NewRelease />
    </div>
  );
}
