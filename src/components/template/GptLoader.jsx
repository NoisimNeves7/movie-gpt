import React from 'react'
import gptLoader from '/gptLoader.gif'

const GptLoader = () => {
  return (
    <div className=' flex items-center justify-center '>
        <img  src={gptLoader} alt="" />
    </div>
  )
}

export default GptLoader;