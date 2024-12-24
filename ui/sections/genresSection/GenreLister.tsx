"use client"

import { genreColors, genres } from '@/lib/constants/genres';
import Image from '@/ui/components/Image/Image';
import useGenre from '@/ui/hooks/useGenreHook';
import Link from 'next/link'
import React, { useEffect } from 'react'


function GenreLister() {
    const { response, fetchGenres } = useGenre();
    
      useEffect(() => {
        fetchGenres();
      }, [fetchGenres]);
      useEffect(() => {
        console.log(response)
      }, [fetchGenres, response, response.data, response.status]);
      
  return (
    <div className="w-full flex gap-2 overflow-x-auto">
            {response.data&&response.ok?response.data.map((genre, id) => (
                <Link
                  href={`/genres/${genre.genre}`}
                  key={id}
                  className="w-[10rem] overflow-hidden group shrink-0 items-center duration-500 font-bold justify-center isolate flex p-2 border-2 border-black dark:border-white rounded-md relative h-24"
                  title={`go to ${genre.genre} genre`}
                >
                    <span className='absolute inset-0 duration-500 group-hover:brightness-[.3] -z-10 size-full block opacity-50' 
                      style={{
                        backgroundColor: genreColors[id]
                      }}
                    />
                    <Image alt={`${genre.genre} genre image`} className='absolute duration-500 group-hover:scale-110 group-hover:brightness-[.3] top-0 -z-10 !size-full inset-0' src={genre.data[0].coverImage.extraLarge}/>
                  {genre.genre}
                </Link>
              )):genres.map((genre, id) => (
                <Link
                  href={`/genres/${genre}`}
                  key={id}
                  className="w-[10rem] shrink-0 items-center overflow-hidden group duration-500 font-bold hover:!text-white bg-white justify-center relative isolate flex p-2 border-2 border-black dark:border-white rounded-md h-24"
                  style={{
                      color: genreColors[id]
                  }}
                  title={`go to ${genre} genre`}
                >
                    <span className='absolute inset-0 duration-500 group-hover:brightness-[.3] -z-10 size-full block opacity-50' 
                      style={{
                        backgroundColor: genreColors[id]
                      }}
                    />
                  {genre}
                </Link>
              ))}
          </div>
  )
}

export default GenreLister