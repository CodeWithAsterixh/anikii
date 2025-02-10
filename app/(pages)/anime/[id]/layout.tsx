"use client";

import Loader from "@/ui/components/Loader/Loader";
import AnimeDetailsLayout from "@/ui/sections/animeInfoSections/AnimeDetailsLayout";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const params = useParams<{ id: string }>();
const id = parseInt(params.id);
  return (
    <div className="w-full h-fit flex flex-col gap-4">
          <Suspense
            fallback={
              <div className="w-full flex items-center justify-center *:scale-75">
                <Loader />
              </div>
            }
          >
            <div className="w-full flex items-center justify-center relative text-tertiary">
              {id&&<AnimeDetailsLayout id={id}>{children}</AnimeDetailsLayout>}
            </div>
          </Suspense>
        </div>
  );
}
