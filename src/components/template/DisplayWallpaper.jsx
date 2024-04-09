import { Link } from "react-router-dom";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";

const DisplayWallpaper = ({ wallpaper }) => {
  // console.log(wallpaper);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
          wallpaper.backdrop_path || wallpaper.profile_path
        }) center/cover no-repeat`,
      }}
      className="w-full h-[45vh] lg:h-[60vh] flex flex-col justify-end items-start px-[5%] py-[3%] gap-4"
    >
      <h1 className="w-[70%]  text-2xl lg:text-4xl text-white font-black">
        {wallpaper.name ||
          wallpaper.title ||
          wallpaper.original_name ||
          wallpaper.original_title}
      </h1>
      <p className="lg:w-[70%] text-sm lg:text-base text-white">
        {wallpaper.overview.slice(0, 200)}...
        <Link to={`${wallpaper.media_type}/detail/${wallpaper.id}`} className="text-blue-600 hover:border-b-2 hover:border-blue-600 ">more</Link>
      </p>
      <p className="text-white  text-sm lg:text-base">
        <i className="mr-2 ri-megaphone-fill text-yellow-500"></i>
        {wallpaper.release_date}
        <i className="mr-2 ri-camera-lens-fill text-yellow-500 ml-5"></i>
        {wallpaper.media_type.toUpperCase()}
      </p>
      <Link to={`/${wallpaper.media_type}/detail/${wallpaper.id}/trailer`}  className="bg-[#e50914] px-2 py-1 text-sm lg:text-base lg:px-4 lg:py-2 rounded text-white font-semibold hover:bg-white hover:text-[#e50914] duration-300">Watch Trailer</Link>
    </div>
  );
};

export default DisplayWallpaper;