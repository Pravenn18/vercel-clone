import React from 'react'

export const ProjectCard = () => {
  return (
      <div className='w-80 h-36 bg-gray-950 rounded-md m-4 hover:cursor-pointer'>
          <div className='flex flex-col text-sm p-4'>
              <p>vercel-clone</p>
              <p className='opacity-50'>vercel-clone-green.vercel.app</p>
              <p className='mt-2 pl-1 w-40 h-3 bg-gray-600 rounded-lg '>Pravenn18/vercel-clone</p>
              <p className='pt-2'>Added index.ts, main file</p>
              <p>3 days ago</p>
          </div>
      </div>
  )
}
