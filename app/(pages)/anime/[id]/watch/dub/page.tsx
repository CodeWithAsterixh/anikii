"use client"
import { StreamingEpisode } from '@/lib/types/anime/__animeDetails';
import { useWatchContext } from '@/store/watchContext/watchPage'
import VideoPlayer from '@/ui/components/Video/Video';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'


export default function DubPage() {
   const params = useParams<{ id: string }>();
  const id = parseInt(params.id);
  const {state} = useWatchContext()
  const [isStreamAvailable, setIsStreamAvailable] = useState<StreamingEpisode | false>(false)
  useEffect(() => {
    if(state.dubStream?.data){
      const isAvailable = !!state.dubStream?.data?.stream_links.find(s => s.name==="mp4upload") 
      setIsStreamAvailable(isAvailable?state.dubStream?.data:false)
    }
  }, [state])
  
  return (
    <div className='p-2'>

      {
        isStreamAvailable&&
        <VideoPlayer src={`https://api-anikii.onrender.com/anime/${id}/stream/ep/1/live?type=dub`} name={isStreamAvailable.anime_info.title}/>
      }
      <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(70px,1fr))] gap-2 p-2">

{
  isStreamAvailable&&Array.from({length:state.mainStream?.data?.episodes?state.mainStream?.data?.episodes:0}).map(
    (i, ind)=>{
      return (
         <div className='w-full bg-primary p-4 flex items-center justify-center rounded-md' key={ind}>ep|{ind+1}</div>
      )
    }
  )
}
</div>
      
    </div>
  )
}