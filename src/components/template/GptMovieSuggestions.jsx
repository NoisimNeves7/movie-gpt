import React from 'react'
import {useSelector} from 'react-redux' 
import HorizontalMovieList from './HorizontalMovieList'
import GptLoader from './GptLoader'

const GptMovieSuggestions = () => {
    const{gptMovieName , tmdbMovieData , searchBtnClicked} = useSelector(state=>state.gpt)
  return searchBtnClicked && (
    
    <div className=' w-[90%]   mx-auto mb-10 rounded  bg-[#76757585]'>
        {gptMovieName ?  gptMovieName.map((value,index)=>(
          <div key={index}> <h1 className='px-5 pt-2 text-2xl font-bold text-white'>{value}</h1>
          <HorizontalMovieList popular={tmdbMovieData[index]} showMore={false} popularCategory={'movie'}/>
            </div> 
        )) : <GptLoader/>}
        </div>
  )
}

export default GptMovieSuggestions