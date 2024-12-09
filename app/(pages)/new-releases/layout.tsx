import AnimeCategSkeleton from "@/ui/sections/popularSection/VideoLoader";
import { Suspense } from "react";

export default function ReleasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <AnimeCategSkeleton heading={{ loading: "Loading new releases ..." }} />
      }
    >
      {children}
    </Suspense>
  );
}
