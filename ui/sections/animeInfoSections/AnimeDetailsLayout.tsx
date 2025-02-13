import useQuery from "@/hooks/useQuery";
import { AnimeInfo } from "@/lib/types/anime/__animeDetails";
import { setInfo } from "@/store/reducers/animeDetailReducer";
import { AppDispatch, RootState } from "@/store/store";
import Image from "@/ui/components/Image/Image";
import Loader from "@/ui/components/Loader/Loader";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  children?: React.ReactNode;
  id: number;
};

export default function AnimeDetailsLayout({ children, id }: Props) {
  const res = useQuery<AnimeInfo>(`/anime/${id}`);
  const { data } = useSelector((s: RootState) => s.AnimeInfo);
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const [currentLocation, setCurrentLocation] = useState("/");
  const [currentColor, setCurrentColor] = useState("#e08e79");

  useEffect(() => {
    const currenPath = pathname.split("/").filter((p) => p.trim() !== "");

    if (currenPath.length <= 2) setCurrentLocation("/");
    else setCurrentLocation(currenPath[currenPath.length - 1]);
  }, [pathname]);


  useEffect(() => {
    if (res.data) {
      dispatch(setInfo(res.data));
    }
  }, [dispatch, res]);

  useEffect(() => {
    if(data){
      const color =data.coverImage.cover_image_color
      setCurrentColor(color);
    }else{
      setCurrentColor("#e08e79")
    }
  }, [data])
  

  if (!data) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (res.status.status == "loading") {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (res.status.status == "error") {
    return (
      <div className="w-full flex flex-col items-center justify-center *:scale-75">
          <b>No content available at the moment</b>
          
        </div>
    );
  }
  const HeaderLinkClass = "px-3 py-1 rounded-md cursor-pointer";

  if (res.status.status == "done") {
    return (
      <div className="w-full h-fit">
        {/* writeup display */}
        <div className="w-full pt-40 pb-10 relative isolate z-0">
          {/* banner image */}
          <span
            style={{
              borderColor:currentColor,
            }}
            className="w-full block border-b-4 fixed h-96 inset-0 -z-10"
          >
            <Image
              src={data.coverImage.bannerImage}
              alt={`cover image of anime titled ${data.title.english} or ${data.title.romaji}`}
              className="!size-full brightness-[.3]"
              width={1000}
              height={1000}
              fallback={
                <span
                  style={{
                    backgroundColor: currentColor,
                  }}
                  className="size-full block opacity-20"
                ></span>
              }
            />
          </span>
  
          <div className="w-full relative px-1 min-[498px]:px-4 flex flex-col sm:grid grid-cols-[20rem,1fr] justify-between gap-4">
            {/* main image */}
            <span className="w-full h-72  sm:min-h-72 sm:h-full block duration-500 group border-8 hover:border-4 rounded-lg shrink-0 !border-accent !bg-accent">
              <Image
                src={data.coverImage.cover_image}
                alt={`image of anime titled ${data.title.english} or ${data.title.romaji}`}
                className="!size-full rounded-md duration-500 group-hover:shadow-lg shadow-base-black/30"
                width={150}
                height={300}
                fallback={
                  <span
                    style={{
                      backgroundColor: currentColor,
                    }}
                    className="size-full block opacity-20"
                  ></span>
                }
              />
            </span>
  
            {/* context */}
  
            <div className="w-full min-h-72 px-2 min-[498px]:px-5 py-5 flex flex-col justify-between bg-accent rounded-lg">
              <div className="w-full flex flex-col gap-2">
                <h1 className="text-xl sm:text-2xl text-tertiary">
                  {data.title.english||data.title.romaji}
                </h1>
                
                {data.title.romaji&&<span className="w-full break-normal">
                  Romaji:
                  <i>{data.title.romaji}</i>
                  </span>}
  
                <b className="mt-2 text-sm sm:text-base">Description:</b>
                <p
                  dangerouslySetInnerHTML={{ __html: data.description }}
                  className="max-h-52 overflow-y-auto scrollbar-h text-tertiary/70 text-sm sm:text-base"
                />
                <strong>
                  Released:{" "}
                  <em className="text-tertiary/70 not-italic">
                    {data.releaseDate}
                  </em>
                </strong>
                <ul className="w-full flex gap-2 flex-wrap mt-2">
                  <li className="w-full font-bold text-sm sm:text-base">
                    Synonyms:
                  </li>
                  {data.synonyms.map((synonym, i) => (
                    <li
                      key={i}
                      className="w-fit shrink-0 text-sm sm:text-base bg-neutral-300 px-2 py-1 rounded-sm"
                    >
                      {synonym}{i !== data.synonyms.length-1&&`,`}
                    </li>
                  ))}
                </ul>
                <ul className="w-full flex gap-2 flex-wrap mt-2">
                  <li className="w-full font-bold text-sm sm:text-base">
                    Genres:
                  </li>
                  {data.genres.map((g, i) => (
                    <li
                      key={i}
                      className="w-fit shrink-0 active:scale-95 duration-300 cursor-pointer px-4 py-1 text-sm sm:text-base rounded-full bg-primary text-accent"
                    >
                      <Link href={`/categories/${g}`}>{g}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="h-fit min-h-[100vh] bg-accent z-10 relative rounded-t-lg isolate">
          <header className="w-full flex flex-col gap-2 min-[498px]:flex-row min-[498px]:items-center justify-between py-3 bg-white backdrop-blur-3xl z-10 sticky top-16">
            <div
              className={clsx(
                "w-full p-2 flex gap-2 overflow-x-auto scroll-px-2 relative overflow-y-hidden snap-x snap-mandatory *:snap-start"
              )}
            >
              <Link
                href={`/anime/${data.id}`}
                className={clsx(HeaderLinkClass, {
                  "bg-tertiary text-accent": currentLocation === "/",
                  "bg-tertiary/10 hover:bg-tertiary/20": currentLocation !== "/",
                })}
              >
                Overview
              </Link>
              <Link
                href={`/anime/${data.id}/watch`}
                className={clsx(HeaderLinkClass, {
                  "bg-tertiary text-accent": currentLocation === "watch",
                  "bg-tertiary/10 hover:bg-tertiary/20":
                    currentLocation !== "watch",
                })}
              >
                Watch
              </Link>
              <Link
                href={`/anime/${data.id}/characters`}
                className={clsx(HeaderLinkClass, {
                  "bg-tertiary text-accent": currentLocation === "characters",
                  "bg-tertiary/10 hover:bg-tertiary/20":
                    currentLocation !== "characters",
                })}
              >
                Characters
              </Link>
            </div>
  
            {/* actions */}
            <div className="w-fit shrink-0 px-2 flex items-center justify-center gap-2">
              <button className="px-4 py-2 bg-secondary rounded-md font-bold text-accent active:scale-95">
                Start watching
              </button>
              <button className="size-10 px-2 flex items-center justify-center active:scale-95 bg-secondary/10 rounded-full font-bold text-secondary">
                <BsHeartFill />
              </button>
            </div>
          </header>
          {children}
        </div>
      </div>
    );
  }

  return null
  
}
