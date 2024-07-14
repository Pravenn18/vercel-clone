import React from 'react'
import { Search } from './search-bar'
import { Button } from './button'

export const TopBar = () => {
  return (
    <div className='flex flex-auto justify-between py-4 gap-2'>
        <Search />
        <Button />
    </div>
  )
}
