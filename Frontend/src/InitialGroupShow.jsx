import React from 'react'
import { NavLink } from 'react-router-dom'

function InitialGroupShow() {

  return (
    <div className='w-full min-h-[98vh] bg-gray-200 flex items-center justify-center flex-col  gap-6 '>
          <h1 className='text-3xl'>You dont have any group now</h1>
          <h2 className='text-xl'>Create group to see group</h2>
          <NavLink to="/create/group" className='px-4 py-3 bg-gray-600 cursor-pointer text-white rounded-md shadow-[0_2px_6px_rgba(0,0,0,0.4)]'>Create Group</NavLink>
        </div>
  )
}

export default InitialGroupShow