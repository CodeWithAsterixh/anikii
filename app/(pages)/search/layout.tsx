import AnimeCategSkeleton from "@/ui/sections/popularSection/VideoLoader";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={<AnimeCategSkeleton heading={{ loading: "Searching ..." }} />}
    >
      {children}
    </Suspense>
  );
}
