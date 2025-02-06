"use client"

import { ReleasesType } from '@/lib/types/anime/__releases'
import { pageInfo } from '@/store/reducers/listReducer';
import AnimeGrid from '@/ui/components/AnimeList/AnimeGrid';
import Pagination from '@/ui/components/pagination/Pagination';
import useAnimeInfos from '@/ui/hooks/useAnimeInfos';
import { Typography } from '@mui/material';
import React, { useCallback } from 'react'

type Props = {
    id:number,
    data:ReleasesType[];
      pageInfo?:pageInfo;
    
}

function Recommendations({data,id,pageInfo}: Props) {
    const {fetchRecommendations} = useAnimeInfos()
  
  
  
   
    const handleNextPage = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_: unknown, page: number) => {
        fetchRecommendations(id,page);
      },
      [fetchRecommendations, id]
    );
  return (
    <div className="p-4 bg-white dark:bg-black text-black dark:text-white shadow-lg">
      <Typography variant="h4" className="!text-2xl !font-bold !mb-4">
        Characters
      </Typography>
      <AnimeGrid animes={data}/>
      <Pagination
      onChange={handleNextPage}
        page={
          pageInfo?pageInfo: {
                currentPage: 0,
                lastPage: 0,
              }
        }
      />
    </div>
  )
}

export default Recommendations