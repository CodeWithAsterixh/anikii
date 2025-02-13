"use client";

import { useWatchContext } from "@/store/watchContext/watchPage";
import Image from "@/ui/components/Image/Image";
import { Card } from "@mui/material";
import { BiImage, BiPlayCircle } from "react-icons/bi";

type Props = object;

export default function Category({}: Props) {
  const {state} = useWatchContext()
  const {mainStream} = state

  return (
    <div className="w-full h-fit grid p-2 gap-2 grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))]">
        {
          mainStream?.data?.streamingEpisodes&&mainStream.data?.streamingEpisodes.map((ep,ind)=>(
            <Card key={ind} className="flex flex-col gap-2 pb-2 !bg-accent !shadow-none">
              <span className="w-full h-32 block rounded-t-md relative overflow-hidden">
              <Image src={ep.thumbnail} alt={ep.title} className="size-full" fallback={
                <span className="size-full bg-tertiary/30 flex items-center justify-center text-xl">
                  <BiImage/>
                </span>
              }/>
              <span className="size-full group hover:backdrop-blur-[2px] cursor-pointer absolute inset-0 opacity-0 hover:opacity-100 bg-black/30 text-white duration-300 flex flex-col gap-2 items-center justify-center text-xl">
                  <BiPlayCircle className="translate-y-0 group-hover:translate-y-3 duration-300"/>
                  <b className="text-xs translate-y-5 group-hover:translate-y-1 duration-300">on {ep.site}</b>
                </span>
              </span>
              <strong className="text-xs">{ep.title}</strong>
            </Card>
          ))
        }
      </div>
  );
}
