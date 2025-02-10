"use client";

import { RootState } from "@/store/store";
import Loader from "@/ui/components/Loader/Loader";
import ScoreChart from "@/ui/components/ScoreChart/ScoreChart";
import { useSelector } from "react-redux";


type Props = object;

export default function Category({}: Props) {
  
  const {data} = useSelector((s:RootState)=>s.AnimeInfo)

  if (!data) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  


  return (
    <div className="w-full h-fit flex flex-col gap-4">
      <div className="w-full h-fit relative isolate p-2 sm:p-4 flex flex-col gap-3 bg-secondary/10">
        <h3 className="text-xl font-bold">Score distribution</h3>
        <ScoreChart scores={data.score_distribution}/>
      </div>
      
     <div className="w-full p-2 sm:p-4 flex flex-col gap-2">
     <h3 className="text-xl font-bold">Trailers</h3>
     <div className="w-56  flex flex-col gap-2 overflow-hidden rounded-md shadow-md">
      {
        // eslint-disable-next-line @next/next/no-img-element
        !data.trailer?.thumbnail?<img className="w-full h-28 object-cover object-center" src={data?.trailer?.thumbnail} alt={`thumbnail for ${data.title.english}`} />:<span className="w-full h-28 bg-tertiary/30"></span>
      }
      <p className="p-2 break-all">{data.trailer?.site}</p>
     </div>
     
     </div>
     <div className="w-full p-2 sm:p-4 flex flex-col gap-2">
     <h3 className="text-xl font-bold">Tags</h3>
     <ul className="space-y-4">
  {
    data.tags.map((tag, index) => (
      <li key={index} className="flex flex-col space-y-1">
        {/* Category Tag */}
        <div className="flex items-center space-x-3">
          <span className="bg-primary/10 rounded px-2 py-1 text-primary">
            {tag.category}
          </span>
          
          {/* Tag Name */}
          <span className="text-sm text-tertiary/50">{tag.name}</span>
          
          {/* Optionally, Display Rank */}
          {tag.rank && (
            <span className="text-xs text-tertiary/50">
              #{tag.rank}
            </span>
          )}
        </div>

        {/* Description */}
        {tag.description && (
          <p className="text-xs text-tertiary">{tag.description}</p>
        )}
      </li>
    ))
  }
</ul>

     </div>
    </div>
  );
}
