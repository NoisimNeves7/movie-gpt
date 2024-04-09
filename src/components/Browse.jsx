import React, { useEffect, useState } from "react";
import Header from "./template/Header";

import axios from "./utils/axios";
import Sidebar from "./template/Sidebar";
import Loader from "./template/Loader";
import DisplayWallpaper from "./template/DisplayWallpaper";
import Dropdown from "./template/Dropdown";
import HorizontalCards from "./template/HorizontalCards";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";
import { useSelector } from "react-redux";
import GptSearch from "./GptSearchPage";

const Browse = () => {
  const showGptSearch = useSelector((state) => state.gpt.value);
  console.log(showGptSearch);

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [tredningCategory, settredningCategory] = useState("all");
  const [popular, setpopular] = useState(null);
  const [popularCategory, setpopularCategory] = useState("tv");

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`trending/${tredningCategory}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("error : " + error);
    }
  };

  const getPopular = async () => {
    const { data } = await axios.get(`${popularCategory}/popular`);
    setpopular(data.results);
  };

  const getWallpaper = async () => {
    try {
      const { data } = await axios.get("trending/movie/day");
      // console.log(data.results);
      const vid = data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(vid);
    } catch (error) {
      console.log("error: " + error);
    }
  };

  // console.log(trending);
  // console.log(popular);

  useEffect(() => {
    !wallpaper && getWallpaper();
    getTrending();
    getPopular();
  }, [tredningCategory, popularCategory]);

  return wallpaper && trending && popular ? (
    <div className="h-screen  w-screen ">
      <Header />
      { showGptSearch ? <GptSearch/>:
      <div className="h-[90%] flex">
        <Sidebar />
        <div className="overflow-y-auto w-full">
          <DisplayWallpaper wallpaper={wallpaper} />

          {/* ----------------------------TRENDING----------------------------- */}
          <div className="mt-10  flex justify-between text-zinc-400 px-4">
            <h1 className="text-3xl">Trending</h1>
            <Dropdown
              title={"Category"}
              options={["movie", "tv", "all"]}
              funct={(e) => settredningCategory(e.target.value)}
            />
          </div>
          <HorizontalCards trending={trending} />

          {/* --------------------------------POPULAR------------------------------- */}
          <div className="mt-10 flex justify-between text-zinc-400 px-4">
            <h1 className="text-3xl">Popular</h1>
            <Dropdown
              title={"Category"}
              options={["movie", "tv"]}
              funct={(e) => setpopularCategory(e.target.value)}
            />
          </div>
          <div className="flex w-[100%] h-[40vh] lg:h-[45vh]  overflow-y-hidden p-5 ">
            {popular.map((value, index) => (
              <Link
                to
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
            {
              <div className=" lg:min-w-[15%] min-w-[40%] h-full  bg-zinc-900 mr-5 mb-5 hover:shadow-sm hover:shadow-[#e50914] duration-500 flex items-center justify-center">
                <Link
                  to={`/popular`}
                  className="flex flex-col justify-center items-center text-zinc-400 hover:text-[#e50914]"
                >
                  <i className="ri-add-circle-line  text-4xl"></i>
                  <h1 className="">Show More</h1>
                </Link>
              </div>
            }
          </div>
        </div>
      </div>}
    </div>
  ) : (
    <Loader />
  );
};

export default Browse;
