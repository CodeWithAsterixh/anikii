"use client"
import { WatchProvider } from '@/store/watchContext/watchPage';
import Loader from '@/ui/components/Loader/Loader';
import WatchLayoutComp from '@/ui/sections/animeInfoSections/WatchLayoutComp';
import React, { Suspense } from 'react';

type Props = {
    children:React.ReactNode
}

export default function WatchLayout({children}: Props) {
    
  return (
    <div className="w-full h-fit flex flex-col gap-4">
              <Suspense
                fallback={
                  <div className="w-full flex items-center justify-center *:scale-75">
                    <Loader />
                  </div>
                }
              >
                <WatchProvider>
                <WatchLayoutComp>
                  {children}
                </WatchLayoutComp>
                </WatchProvider>
                
              </Suspense>
            </div>
  )
}