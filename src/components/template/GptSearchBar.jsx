import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useSelector, useDispatch } from "react-redux";
import openai from "../utils/openai";
import axios from "../utils/axios";
import { addGptMovieResult, setSearchBtnClicked } from "../../store/reducers/gptSlice";

const GptSearchBar = () => {
  const language = useSelector((state) => state.language.value);
  const searchText = useRef(null);
  const dispatch = useDispatch()

  const searchTmdbMovie = async (movie) => {
    try {
      const { data } = await axios.get(`/search/movie?query=${movie}`);
      dispatch(setSearchBtnClicked(true))
      return data.results;
      
    } catch (error) {
      console.log("error : " + error);
    }
  };

  const handleGptSearchClick = async () => {
    const query =
      "Act as a Movie Recomendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". Only give me name of 5 movies, comma separated like the example result given ahead. Example Results: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo",
    });
    //   from here i will get data in this form  "Andaz Apna Apna, Chupke Chupke, Padosan, Mera Naam Joker, Hera Pheri" so i will convert this into an array seprated by comma in next step
    const gptMovieList = gptResults.choices[0].message.content.split(",");
    // ["Andaz Apna Apna"," Chupke Chupke"," Padosan"," Mera Naam Joker"," Hera Pheri"]
    // for each movie i will sending the name to tmdb 
    const promiseArray = gptMovieList.map((value) => searchTmdbMovie(value));
    // in this constant what i m going to get is an array of promises because it is sync code the map will call the api without waiting for result from the previous call
    // so int end i will be having data as [promise,promise,promise,promise,promise]
    const result = await Promise.all(promiseArray);
    // so for resolving the promise issue what will i do is i will be using Promise.all(accept array of promises)  and use await with the help of this waht will happen is i will be getting the data all at once because it will treat all the promise as same and going to wait until all the promises gets resolved also  It rejects when any of the input's promises rejects, with this first rejection reason. and thats how i will be getting my data completely fine 
   
    // console.log(result);

    // im sending the data in form object because in store i have created a single action for adding these two values the reason i m sending it in form of object because i will destrucutre the object in gptSlice.jsx 
    dispatch(addGptMovieResult({gptMovieName:gptMovieList,tmdbMovieData:result}))
  };

  return (
    <div className="w-full  pt-[10%] pb-[5%] flex justify-center ">
      <form
        className=" w-[50%] flex justify-around"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="px-4 outline-none py-3 rounded w-[80%] "
          placeholder={lang[language].searchPlaceholder}
        />
        <button
          onClick={() => handleGptSearchClick()}
          className="px-4 text-white  font-semibold py-1 items-center bg-[#e50914] rounded-lg w-[10%] flex justify-center"
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
