import React from 'react'
import notFound from '/notfound.gif'

const NotFound = () => {
  
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-[#FFFFFF] '>
        <img className=' '  src={notFound} alt="" />
    </div>
  )
}

export default NotFound