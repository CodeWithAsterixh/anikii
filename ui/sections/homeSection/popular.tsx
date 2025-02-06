import { AnimeListItem } from '@/lib/types/anime/__animeListItem'
import AnimeCard from '@/ui/components/AnimeCard/AnimeCard'
import Loader from '@/ui/components/Loader/Loader'
import React from 'react'

type Props = {
    data?:AnimeListItem[]
}

export default function Popular({data}: Props) {
  return (
    <div className="w-[calc(100%-1rem)] mx-2 sm:mx-0 sm:w-full border-2 h-fit mt-3 rounded-lg  border-primary flex flex-col gap-2">
          <h2 className="text-tertiary sticky top-0 z-10 font-bold text-lg bg-primary rounded-t-md p-2">
            Popular releases
          </h2>

          {data ? (
            <div className="w-full h-fit gap-2 p-2 grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] isolate z-0">
              {data.map((d, i) => (
                <AnimeCard anime={d} key={i} />
              ))}
              {/* releases content */}
            </div>
          ) : (
            <>
              <Loader />
            </>
          )}
        </div>
  )
}