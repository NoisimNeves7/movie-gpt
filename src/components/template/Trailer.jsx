import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideo = useSelector((state) => state[category].info.videos);

  // State to hold window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to update window width state
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Add event listener to window resize event
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set dimensions based on window width
  const widthProp = windowWidth < 600 ? 300 : 1200;
  const heightProp = windowWidth < 600 ? 200 : 600;

  return (
    <div className="h-screen w-screen fixed top-0 right-0 bg-[rgba(0,0,0,0.8)] z-10 flex justify-center items-center ">
      <i
        onClick={() => navigate(-1)}
        className="ri-close-fill text-zinc-400 hover:text-[#e50914] absolute lg:top-10 top-3 right-5 lg:right-20 text-4xl"
      ></i>
      
      {ytVideo ? (
        <ReactPlayer
          width={widthProp}
          height={heightProp}
          controls
          url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;