/* eslint-disable @typescript-eslint/no-unused-vars */
import { anikiiApi } from "@/lib/mods/requests/axios";
import { responseInfo } from "@/store/reducers/__types";
import { useCallback, useEffect, useState } from "react";

export default function useQuery<T>(endpoint: string, carryOn:boolean=true) {
  const [status, setStatus] = useState<responseInfo>({
    ok: true,
    status: "loading",
  });
  const [data, setData] = useState<T>();

  const getData = useCallback(async (endpoint: string) => {
    try {
      const res = await anikiiApi(endpoint);
      const resData: T = res.data;
      setStatus({
        ok: true,
        status: "done",
      });
      setData(resData);
    } catch (error) {
      setStatus({
        ok: false,
        status: "error",
      });
    }
  }, []);

  useEffect(() => {
    if(carryOn){
      getData(endpoint);
    }
  }, [carryOn, endpoint, getData]);

  return {
    status,
    data
  };
}
