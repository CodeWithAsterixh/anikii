"use client";

import useQuery from "@/hooks/useQuery";
import { dataWithPage } from "@/store/reducers/__types";
import AnimeCard from "@/ui/components/AnimeCard/AnimeCard";
import AnimeGrid from "@/ui/components/AnimeList/AnimeGrid";
import Image from "@/ui/components/Image/Image";
import Loader from "@/ui/components/Loader/Loader";
import Pagination from "@/ui/components/pagination/Pagination";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

type Props = object;

export default function Category({}: Props) {
  const { category } = useParams<{ category: string }>();
  const query = useSearchParams();
  const page = parseInt(query.get("page") || "1");
  const { data } = useQuery<dataWithPage>(`/genres/${category}?page=${page}`);
  const [bgImage, setBgImage] = useState<string>();

  const changeCategoryBgImage = useCallback(() => {
    if (data?.data) {
      const imageSrc =
        data.data[Math.floor(Math.random() * (data.data.length - 1) + 1)]
          .coverImage.bannerImage;
      setBgImage(imageSrc);
    }
  }, [data]);

  useEffect(() => {
    changeCategoryBgImage();
  }, [changeCategoryBgImage]);

  return (
    <div className="w-full h-fit flex flex-col gap-4">
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center *:scale-75">
            <Loader />
          </div>
        }
      >
        <div className="w-full flex items-center justify-center relative">
          <span className="w-full h-52 bg-tertiary">
            {data?.data && bgImage && (
              <Image
                src={bgImage}
                alt={`${category} page`}
                width={1000}
                height={1000}
                className="w-full h-full brightness-[.3] duration-500"
              />
            )}
          </span>
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-accent uppercase">
            {category}
          </h2>
        </div>

        
          {data?.data  ? <AnimeGrid className="w-full h-fit gap-2 !p-2 isolate z-0 mb-20">{
            data.data.map((d, i) => <AnimeCard anime={d} key={i} />)
          }</AnimeGrid> : (
            <div className="w-full flex items-center justify-center *:scale-75">
              <Loader />
            </div>
          )}
      </Suspense>

      <Pagination
        page={
          data?.pageInfo
            ? data?.pageInfo
            : {
                currentPage: page,
                lastPage: 50,
              }
        }
      />
    </div>
  );
}
