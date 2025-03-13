import Loader from '@/ui/components/Loader/Loader'
import React, { Suspense } from 'react'

type Props = {
    children: React.ReactNode
}

export default function layout({children}: Props) {
  return <Suspense fallback={<Loader/>}>
    {children}
  </Suspense>
}