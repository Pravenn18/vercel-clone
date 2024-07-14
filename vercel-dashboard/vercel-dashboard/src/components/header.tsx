import React from 'react'
import Image from 'next/image'
import { Navbar } from './navbar'

export const Header = () => {
  return (
    <div className="flex flex-col justify-center p-2 bg-gray-950 bg-opacity-20 h-16">
      <div className='flex justify-between items-center'>
        <div className="flex text-[10px] font-medium items-center">
            <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={54}
            height={24}
            priority
            />
            <span className="px-1"> / insanepraveen2018@gmail.com's project</span>
        </div>
        <div className="text-[10px] font-medium">User</div>
      </div>
      <div className='flex justify-start items-center text-[9px] pt-4'>
        <Navbar />
      </div>
    </div>
  )
}
