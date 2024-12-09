import AnimeCategSkeleton from "@/ui/sections/popularSection/VideoLoader";
import { Suspense } from "react";

export default function PopularLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <AnimeCategSkeleton
          heading={{ loading: "Loading Popular anime ..." }}
        />
      }
    >
      {children}
    </Suspense>
  );
}
