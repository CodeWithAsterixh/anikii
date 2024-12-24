"use client";
import { ReleasesType } from "@/lib/types/anime/__releases";
import { responseStatus } from "@/store/reducers/listReducer";
import AnimeGrid, { AnimeGridSkeleton } from "@/ui/components/AnimeList/AnimeGrid";
import AnimeGrouper from "@/ui/components/AnimeList/AnimeGrouper";
import AnimeList, {
  AnimeListSkeleton,
} from "@/ui/components/AnimeList/AnimeList";
// import { usePathname } from "next/navigation";


type prop = {
  animes: ReleasesType[];
  genre: string;
  processInfo: responseStatus;
  reloader?:React.ReactNode;
  type?:"scroll"|"grid"
}
export default function GenresSectionList({animes, processInfo, genre,reloader, type="scroll"}:prop) {
  // const pathName = usePathname();
  
  return(
    <AnimeGrouper
    header={{
      error:
        processInfo==="error"
          ? "Some error occurred, please reload"
          : undefined,
      loaded: processInfo === "done" ? `"${genre}" Anime List` : undefined,
      loading:
        processInfo === "loading"
          ? `Loading "${genre}" anime list...`
          : undefined,
    }}
    sxClasses={{
      containerClass: "!px-2 rounded-md bg-base-white dark:bg-black/30 !p-2 backdrop-blur-sm",
      navContainerClass:"!px-0"
    }}
    // className="backdrop-blur-md"
    
  >
    {animes && processInfo!== "error"?animes.length > 0 ? (
        
          type==="grid"?<AnimeGrid animes={animes} />:<AnimeList animes={animes} />
        
          
        ) : (
          type==="grid"?<AnimeGridSkeleton/>:<AnimeListSkeleton />
        ):reloader}
  </AnimeGrouper>
  )
}
