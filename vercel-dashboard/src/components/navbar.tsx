import React from 'react'

const items = [
  {
    item: "Overview",
  },
  {
    item: "Integration",
  },
  {
    item: "Activity",
  },
  {
    item: "Domain",
  },
  {
    item: "Monitoring",
  },
  {
    item: "Settings",
  }
]

export const Navbar = () => {
  return (
    <div className='flex gap-4 hover:cursor-pointer'>
      {items.map((data, index) => (
        <p key={index}>{data.item}</p>
      ))}
    </div>
  )
}
