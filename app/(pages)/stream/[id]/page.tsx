"use client";

import { getStreamInfo } from "@/lib/mods/middlewares/getStreamInfo";
import { process, StreamInfo } from "@/lib/types/__anikii_api";
import AnimeStreamSection from "@/ui/sections/popularSection/AnimeStreamSection";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
type Props = object;
interface streamInfo {
  data?: StreamInfo;
  load?: process;
}

export default function AnimeDetails({}: Props) {
  const { id } = useParams();
  const [datas, setDatas] = useState<streamInfo>();

  const loadRecommendation = useCallback(async () => {
    let timing = 0;
    setDatas((dt) => ({
      ...dt,
      load: "loading",
    }));
    try {
      const data = await getStreamInfo(typeof id === "string" ? id : "");
      console.log(data);
      setDatas({
        data,
        load: "done",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (timing < 4) {
        loadRecommendation();
        timing++;
      } else {
        setDatas((dt) => ({
          ...dt,
          load: "error",
        }));
      }
    }
  }, [id]);
  useEffect(() => {
    loadRecommendation();
  }, [loadRecommendation]);

  return (
    <div className="w-full h-fit">
      {datas?.data && <AnimeStreamSection data={datas.data} />}
    </div>
  );
}
