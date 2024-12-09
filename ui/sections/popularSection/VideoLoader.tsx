import { AnimeGridSkeleton } from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import React from "react";

type Props = {
  heading?: {
    loading: string;
  };
};

export default function AnimeCategSkeleton({ heading }: Props) {
  return (
    <AnimeGrouper header={heading?.loading}>
      <AnimeGridSkeleton />
    </AnimeGrouper>
  );
}
