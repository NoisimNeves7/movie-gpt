import React from "react";
import bg from "/bg.jpg";
import GptSearchBar from "./template/GptSearchBar";
import GptMovieSuggestions from "./template/GptMovieSuggestions";


const GptSearch = () => {
  
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.5),rgba(0,0,0,.6)), url(${bg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-screen h-[90%] overflow-y-auto "
    >
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  );
};

export default GptSearch;
