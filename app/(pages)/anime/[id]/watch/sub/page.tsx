"use client";
import {
  StreamingEpisode,
  StreamingLink,
} from "@/lib/types/anime/__animeDetails";
import { useWatchContext } from "@/store/watchContext/watchPage";
import VideoPlayer from "@/ui/components/Video/Video";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiPlayCircle } from "react-icons/bi";


export default function SubPage() {
  const params = useParams<{ id: string }>();
  const [currentlyPlayed, setCurrentlyPlayed] = useState<
    StreamingLink | "live"
  >();
  const id = parseInt(params.id);
  const { state } = useWatchContext();
  const [isStreamAvailable, setIsStreamAvailable] = useState<
    StreamingEpisode | false
  >(false);
  const [epLen, setEpLen] = useState(0)
  const router = useRouter()
  useEffect(() => {
    if (state.subStream?.data) {
      const isAvailable = !!state.subStream?.data?.stream_links.find(
        (s) => s.name === "mp4upload"
      );
      const isStrAv = isAvailable ? state.subStream?.data : false;
      setIsStreamAvailable(isStrAv);
      setCurrentlyPlayed(
        isStrAv ? "live" : state.subStream?.data?.stream_links[0]
      );
      setEpLen(state.mainStream?.data?.episodes||state.mainStream?.data?.streamingEpisodes.length||0)
    }
  }, [state]);


  return (
    <div className="p-2">
      {currentlyPlayed &&
        (currentlyPlayed === "live" ? (
          <VideoPlayer
            src={`https://api-anikii.onrender.com/anime/${id}/stream/ep/1/live`}
            name={isStreamAvailable ? isStreamAvailable.anime_info.title : ""}
          />
        ) : (
          <iframe
            className="w-full h-auto aspect-square !max-h-[60vh]"
            width="640"
            height="360"
            src={currentlyPlayed.url}
          ></iframe>
        ))}
      <div className="w-full bg-secondary/20 rounded-b-md">
        <h3 className="px-2 text-base min-[320px]:text-lg">Stream from:</h3>
        <div className="w-full overflow-x-auto flex snap-mandatory snap-x *:snap-center gap-2 p-2 scroll-px-2">
          {
            isStreamAvailable&&<div
            className="w-fit bg-tertiary py-2 px-4 flex gap-2 text-accent items-center justify-center rounded-md"
            onClick={()=>setCurrentlyPlayed("live")}
          >
            <BiPlayCircle />
            Anikii Stream
          </div>
          }
          {state.subStream?.data?.stream_links.map((i, ind) => {
            return (
              <div
                className="w-fit cursor-pointer bg-tertiary py-2 px-4 flex gap-2 text-accent items-center justify-center rounded-md"
                key={ind}
                onClick={()=>setCurrentlyPlayed(i)}
              >
                <BiPlayCircle />
                {i.name}
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(70px,1fr))] gap-2 p-2">
        {isStreamAvailable &&
          Array.from({
            length: epLen,
          }).map((i, ind) => {
            return (
              <div
                className="w-full bg-primary p-4 flex items-center justify-center rounded-md"
                key={ind}
                onClick={()=>router.push(`?ep=${ind+1}`)}
              >
                ep|{ind + 1}
              </div>
            );
          })}
      </div>
    </div>
  );
}
