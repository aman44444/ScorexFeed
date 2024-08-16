import React from 'react'

const Navbar = () => {
  return (
    <div className=' bg-black  w-full h-full flex justify-center  items-center'>
        
        <div className='flex flex-col'>
            <div className='flex justify-center'>
              <p className='text-green-800 font-semibold'>Scores</p>
              <p className='text-white font-semibold'>Source</p>
            </div>
            <div>
             <p className='text-xs'>
              The best Source of Scores and News
             </p>
            </div>
        </div>
    </div>
  )
}

export default Navbar