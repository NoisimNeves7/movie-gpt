import React from 'react'
import loader from '/loader.gif'

const Loader = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-black '>
        <img  src={loader} alt="" />
    </div>
  )
}

export default Loader