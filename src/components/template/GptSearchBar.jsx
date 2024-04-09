import React from 'react'
import lang from '../utils/languageConstant'
import {  useSelector } from "react-redux";


const GptSearchBar = () => {
    const language = useSelector(state=>state.language.value);
    
  return (
    <div className='w-full py-[10%] flex justify-center '>
        <form className=' w-[50%] flex justify-around'>
            <input type="text" className='px-4 outline-none py-3 rounded w-[80%] ' placeholder={lang[language].searchPlaceholder} />
            <button className='px-4 text-white  font-semibold py-1 items-center bg-[#e50914] rounded-lg w-[10%] flex justify-center'>{lang[language].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar