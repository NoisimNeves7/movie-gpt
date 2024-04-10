import React from 'react'
import noimage from '/noimage.jpg'
import { Link } from 'react-router-dom'

const HorizontalMovieList = ({popular,showMore,popularCategory}) => {
  return (
    <div className="flex w-[100%] h-[40vh] lg:h-[45vh]  overflow-y-hidden p-5 ">
            {popular.map((value, index) => (
              <Link
                to={`/${popularCategory}/detail/${value.id}`}
                key={index}
                className=" lg:min-w-[15%] min-w-[40%] h-full  bg-zinc-900 mr-5 mb-5 hover:shadow-sm hover:shadow-[#e50914] duration-500"
              >
                <img
                  className="w-full h-[70%] object-cover"
                  src={
                    value.backdrop_path ||
                    value.poster_path ||
                    value.profile_path
                      ? `https://image.tmdb.org/t/p/original/${
                          value.backdrop_path ||
                          value.poster_path ||
                          value.profile_path
                        }`
                      : noimage
                  }
                  alt=""
                />
                <div className="text-white p-3  h-[30%]  overflow-y-auto">
                  <h1 className="lg:text-xl font-semibold">
                    {value.name ||
                      value.title ||
                      value.original_name ||
                      value.original_title}
                  </h1>
                  {value.overview && (
                    <p className="text-sm lg:text-base">
                      {value.overview.slice(0, 70)}...{" "}
                      <span className="text-zinc-500 hover:border-b-2 hover:border-zinc-500">
                        more
                      </span>
                    </p>
                  )}
                </div>
              </Link>
            ))}
            {showMore ?
              <div className=" lg:min-w-[15%] min-w-[40%] h-full  bg-zinc-900 mr-5 mb-5 hover:shadow-sm hover:shadow-[#e50914] duration-500 flex items-center justify-center">
                <Link
                  to={`/popular`}
                  className="flex flex-col justify-center items-center text-zinc-400 hover:text-[#e50914]"
                >
                  <i className="ri-add-circle-line  text-4xl"></i>
                  <h1 className="">Show More</h1>
                </Link>
              </div> :null
            }
          </div>
  )
}

export default HorizontalMovieList