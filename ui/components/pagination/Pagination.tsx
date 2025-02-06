"use client";

import { pageInfo } from "@/store/reducers/__types";
import { Pagination as PaginationComp } from "@mui/material";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useDeferredValue } from "react";

type Props = {
  onChange?: (_: unknown, page: number) => void;
  page: pageInfo;
};

export default function Pagination({ onChange, page }: Props) {
  const router = useRouter();
  const currentPage = useDeferredValue(page.currentPage);
  const handleNavPage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_: unknown, page: number) => {
      if (onChange) {
        onChange(_, page);
        return;
      }
      router.push(`?page=${page}`);
    },
    [onChange, router]
  );

  return page.currentPage ? (
    <footer className="w-full flex items-center justify-center fixed top-[calc(100vh-6rem)] pt-5">
      <div className="w-fit p-4 bg-tertiary/30 backdrop-blur-3xl rounded-full">
        <Suspense fallback={""}>
          <PaginationComp
            count={page.lastPage}
            siblingCount={0}
            page={currentPage}
            boundaryCount={2}
            onChange={handleNavPage}
            className="!text-white"
            sx={{
              "& .MuiPaginationItem-root": {
                color:"var(--accent)",
                "&:hover": {
                  color: "var(--accent)",
                },
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                color: "white",
                backgroundColor: "var(--tertiary)",
                "&:hover": {
                  backgroundColor: "var(--tertiary)",
                },
              },
            }}
          />
        </Suspense>
      </div>
    </footer>
  ) : null;
}
