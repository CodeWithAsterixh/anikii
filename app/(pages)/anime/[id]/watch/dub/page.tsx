"use client"
import { useWatchContext } from '@/store/watchContext/watchPage'
import React from 'react'


export default function DubPage() {
  const {state} = useWatchContext()
  return (
    <div>{
      state.dubStream?.status
      }</div>
  )
}