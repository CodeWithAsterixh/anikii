import AnimeCategSkeleton from "@/ui/sections/popularSection/VideoLoader";
import { Suspense } from "react";

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <AnimeCategSkeleton heading={{ loading: "Loading movies ..." }} />
      }
    >
      {children}
    </Suspense>
  );
}
