import { AnimeData, StreamingEpisode } from "@/lib/types/anime/__animeDetails";
import { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import { responseStatus } from "../reducers/__types";


export interface WatchPageState {
    mainStream?: {
        data?:AnimeData,
        status:responseStatus
    };
    subStream?: {
        data?:StreamingEpisode,
        status:responseStatus
    };
    dubStream?: {
        data?:StreamingEpisode,
        status:responseStatus
    };
}
export interface WatchPageContext {
  state: WatchPageState;
  setState: Dispatch<SetStateAction<WatchPageState>>;
}
const WatchContext = createContext<WatchPageContext|undefined>(undefined);

export const WatchProvider = ({children}:{children:React.ReactNode})=>{
    const [state, setState] = useState<WatchPageState>({
        dubStream:{
            status:"loading"
        },
        subStream:{
            status:"loading"
        },
        mainStream:{
            status:"loading"
        },
    })

    return(
        <WatchContext.Provider value={{state, setState}}>
            {children}
        </WatchContext.Provider>
    )
}

export const useWatchContext = () => {
    const context = useContext(WatchContext);
    if (!context) {
      throw new Error("useWatchContext must be used within an WatchProvider");
    }
    return context;
  };
