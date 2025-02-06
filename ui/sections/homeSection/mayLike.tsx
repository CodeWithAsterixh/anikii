import { AnimeListItem } from '@/lib/types/anime/__animeListItem'
import { responseStatus } from '@/store/reducers/__types';
import AnimeCardMini from '@/ui/components/AnimeCard/AnimeCardMini';
import Loader from '@/ui/components/Loader/Loader';
import React from 'react'

type Props = {
    data?:AnimeListItem[];
    status?:responseStatus;
}

export default function MayLike({data,status}: Props) {
  return (
    <div className="w-[calc(100%-1rem)] mx-2 sm:mx-0 sm:w-full border-2 h-fit md:h-full rounded-lg bg-primary/15 border-primary flex flex-col gap-2 md:overflow-y-auto">
            <h2 className="text-tertiary sticky font-bold text-lg top-0 bg-accent p-2 rounded-t-md">
              You may like
            </h2>
    
            <div className="w-full h-fit flex flex-col gap-2 p-2">
              {status === "done" ? (
                data &&
                data.map((d, i) => <AnimeCardMini key={i} data={d} />)
              ) : (
                <>
                  <Loader />
                </>
              )}
              {/* releases content */}
            </div>
          </div>
  )
}