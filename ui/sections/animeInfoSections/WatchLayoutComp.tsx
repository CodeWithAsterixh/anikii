import useQuery from "@/hooks/useQuery";
import { AnimeData, StreamingEpisode } from "@/lib/types/anime/__animeDetails";
import { useWatchContext } from "@/store/watchContext/watchPage";
import Loader from "@/ui/components/Loader/Loader";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function WatchLayoutComp({ children }: Props) {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams()
  const currentEp = searchParams.get("ep")||1
  const pathName = usePathname();

  const { state, setState } = useWatchContext();
  const watchRes = useQuery<AnimeData>(`/anime/${id}/stream`);
  const dubRes = useQuery<StreamingEpisode>(`/anime/${id}/stream/${currentEp}?type=dub`);
  const subRes = useQuery<StreamingEpisode>(`/anime/${id}/stream/${currentEp}`);
  const [tab, setTab] = useState<"mainStream" | "dubStream" | "subStream">(
    "mainStream"
  );
  useEffect(() => {
    const lastPath = pathName.split("/").slice(-1)[0]
    if(lastPath === "dub"){
        setTab("dubStream")
    }else if(lastPath === "sub"){
        setTab("subStream")
    }else{
        setTab("mainStream")
    }
  }, [pathName])
  

  useEffect(() => {
    setState((s) => ({
      ...s,
      mainStream: {
        ...s.mainStream,
        data: watchRes.data,
        status: watchRes.status.status,
      },
      dubStream: {
        ...s.dubStream,
        data: dubRes.data,
        status: dubRes.status.status,
      },
      subStream: {
        ...s.subStream,
        data: subRes.data,
        status: subRes.status.status,
      },
    }));
  }, [dubRes.data, dubRes.status.status, setState, watchRes.data, watchRes.status.status]);

  return (
    <div className="w-full h-fit flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2 min-[498px]:flex-row min-[498px]:items-center p-2 justify-between sticky z-10 top-48 min-[498px]:top-32 bg-accent py-1 shadow-md">
        <div className="w-fit flex items-center justify-start gap-2">
        <h3 className="font-bold text-base min-[498px]:text-lg shrink-0">Watch anime</h3>
        <div className="w-fit flex max-w-full overflow-x-auto items-center justify-start gap-2 snap-x snap-mandatory *:snap-start">
        <Link className={["font-bold text-sm px-3 py-1 rounded-md",tab==="mainStream"?"bg-tertiary/70 text-white":"bg-tertiary/30 text-tertiary" ].join(" ")} href={`/anime/${id}/watch`}>main</Link>
        <Link className={["font-bold text-sm px-3 py-1 rounded-md",tab==="dubStream"?"bg-tertiary/70 text-white":"bg-tertiary/30 text-tertiary" ].join(" ")} href={`/anime/${id}/watch/dub`}>Dub</Link>
        <Link className={["font-bold text-sm px-3 py-1 rounded-md",tab==="subStream"?"bg-tertiary/70 text-white":"bg-tertiary/30 text-tertiary" ].join(" ")} href={`/anime/${id}/watch/sub`}>Sub</Link>
        </div>
        </div>
        <span className="font-bold text-base">
          Episodes{" "}
          <i className="not-italic font-normal text-tertiary/60">
            {state.mainStream?.data?.episodes||state.mainStream?.data?.streamingEpisodes.length}
          </i>
        </span>
      </div>

      {state[tab]?.status === "loading" ? (
        <div className="w-full flex items-center justify-center *:scale-75">
          <Loader />
        </div>
      ) :state[tab]?.status === "error"?
      <div className="w-full flex flex-col items-center justify-center *:scale-75 z-0 relative">
          <b>No &quot;{tab.toLowerCase().replace("stream","")}&quot; content available at the moment</b>
          
        </div>
      : (
        children
      )}
    </div>
  );
}
