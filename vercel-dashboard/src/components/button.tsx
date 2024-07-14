'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export const Button = () => {
    const router = useRouter();
    const handleRoute = () => {
        router.push('/project');
    }
  return (
    <div className='flex justify-center items-start pt-2 w-32 bg-gray-500 hover:cursor-pointer rounded-md'>
        <p onClick={handleRoute}>
            Add New
        </p>
    </div>
  )
}
