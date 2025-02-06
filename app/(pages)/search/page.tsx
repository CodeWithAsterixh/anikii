"use client";
import Loader from "@/ui/components/Loader/Loader";
import MainSearchResult from "@/ui/sections/searchResult/MainSearchResult";
import { Suspense } from "react";

export default function SearchPage() {
  const loader = (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-4">
      <Loader />
      <strong className="animate-pulse text-tertiary opacity-50">
        Loading ...
      </strong>
    </div>
  );

  return (
    <Suspense fallback={loader}>
      <MainSearchResult />
    </Suspense>
  );
}
