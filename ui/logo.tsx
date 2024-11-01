import { BookOpenText } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import React from 'react'

type Props = {
  bookSize?: "sm"|"xs"|"base"|"lg"|"xl"|"2xl"|"3xl"|"4xl"|"5xl"|"6xl"|"7xl"|"8xl",
  className?:string
}

function Logo({bookSize, className}: Props) {
  
  return (
    <span className={
      clsx(
        'font-extrabold flex items-center justify-center text-2xl text-primary dark:text-secondary',
        className? className: ""
      )
    }>
        <BookOpenText className={bookSize?`text-${bookSize}`:`text-4xl`} weight='duotone' />
        <span className='theme-base !bg-transparent'>Tutor</span>IX
    </span>
  )
}

export default Logo