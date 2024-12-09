"use client";

import Pagination from "@/ui/components/pagination/Pagination";
import MoviesSection from "@/ui/sections/popularSection/moviesSection";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = object;

export default function Movies({}: Props) {
  const params = useSearchParams();
  const page = params.get("page");
  const router = useRouter();

  const handleNavigatePage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: unknown, page: number) => {
      router.push(`?page=${page}`);
    },
    [router]
  );
  const paged = page && !isNaN(parseInt(page)) ? parseInt(page) : 1;

  return (
    <div className="w-full h-fit pb-10">
      <MoviesSection page={paged} />
      <Pagination page={paged} onChange={handleNavigatePage} />
    </div>
  );
}
