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
import HorizontalMovieList from "./template/HorizontalMovieList";

const Browse = () => {
  const showGptSearch = useSelector((state) => state.gpt.value);
  // console.log(showGptSearch);

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
    <div className="h-screen  w-screen  ">
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
          <HorizontalCards trending={trending} cardtype={'trending'}/>

          {/* --------------------------------POPULAR------------------------------- */}
          <div className="mt-10 flex justify-between text-zinc-400 px-4">
            <h1 className="text-3xl">Popular</h1>
            <Dropdown
              title={"Category"}
              options={["movie", "tv"]}
              funct={(e) => setpopularCategory(e.target.value)}
            />
          </div>
          <HorizontalMovieList popular={popular} showMore={true} popularCategory={popularCategory} />
        </div>
      </div>}
    </div>
  ) : (
    <Loader />
  );
};

export default Browse;
