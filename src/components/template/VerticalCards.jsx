import React from 'react'
import { Link } from 'react-router-dom'
import noimage from '/noimage.jpg'
// import ScrollToTopButton from './SrollToTopButton'

const VerticalCards = ({data,title}) => {
  return (
    <div className="w-full bg-[#1F1E24] h-full  flex flex-wrap px-[5%] py-[1%] ">
         
    <Link
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="fixed bottom-7 right-5 z-[200] lg:bottom-[5%] lg:right-[5%] flex justify-center items-center w-[5vh] h-[5vh] bg-[#e50914] hover:text-[#e50914] hover:bg-white text-white duration-300 rounded-lg"
    >
      <i className=" ri-arrow-up-line text-xl"></i>
    </Link>
    {data.map((value, index) => (
      <Link
        to={`/${value.media_type || title}/detail/${value.id}`}
        className="mr-20 mb-14 w-[13vh] lg:w-[25vh]  "
        key={index}
      >
        <div className=" h-[20vh]  lg:h-[40vh] bg-black relative">
          <img
            className="h-full w-full   rounded-sm shadow-2xl  shadow-black shadow-[8px_17px_38px_2px_rgba(0,0,0,.5) "
            src={
              value.poster_path || value.backdrop_path || value.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    value.poster_path ||
                    value.backdrop_path ||
                    value.profile_path
                  }`
                : noimage
            }
            alt=""
          />
          {value.vote_average ? (
            <div className="h-[3vh] w-[3vh] lg:h-[5vh] lg:w-[5vh] bg-yellow-600 flex items-center justify-center rounded-full text-white text-base lg:text-lg absolute font-semibold -right-2 lg:-right-5 bottom-5">
              {(value.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          ) : (
            <></>
          )}
          {value.original_language && (
            <div className="h-[3vh] w-[3vh] lg:h-[5vh] lg:w-[5vh] bg-yellow-600 flex items-center justify-center rounded-full text-white text-base lg:text-lg absolute font-semibold -left-2 lg:-left-5 bottom-5">
              {value.original_language}
            </div>
          )}
        </div>
        <h1 className="text-zinc-300  lg:text-2xl font-semibold mt-4">
          {value.name ||
            value.title ||
            value.original_name ||
            value.original_title}
        </h1>
      </Link>
    ))}
    
  </div>
  )
}

export default VerticalCards