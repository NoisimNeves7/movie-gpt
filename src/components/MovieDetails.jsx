import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadMovie, removeMovie } from "../store/actions/MovieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./template/Loader";
import { FaWikipediaW } from "react-icons/fa";
import { SiImdb } from "react-icons/si";
import HorizontalCards from "./template/HorizontalCards";

const MovieDetails = () => {
  document.title = 'NEVES7 | Movie Details'
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);
  // console.log(info);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { pathname } = useLocation();
  // console.log(pathname);
  useEffect(() => {
    dispatch(asyncLoadMovie(id));

    return () => {
      dispatch(removeMovie());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${
          info.details.backdrop_path || info.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen  overflow-y-auto px-[5%] py-[1%] relative"
    >
      {/* part - 1 NAVBAR  */}
      <nav className="text-zinc-200 flex items-center text-2xl gap-10 ">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#e50914] "
        ></i>

        <a target="_blank" href={info.details.homepage}>
          <i className="ri-external-link-fill hover:text-[#e50914]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`}
        >
          <FaWikipediaW className="hover:text-[#e50914]" />
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalIds.imdb_id}/`}
        >
          <SiImdb className="hover:text-[#e50914]" />
        </a>
      </nav>

      {/* part - 2 MOVIE INFO */}

      <div className="w-full px-[5%] py-[3%] lg:flex gap-10">
        <img
          className=" h-[70vh] lg:h-[60vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] "
          src={`https://image.tmdb.org/t/p/original/${info.details.poster_path}`}
          alt=""
        />
        <div className="text-white ">
          <h1 className="text-3xl lg:text-5xl  font-black">
            {info.details.name ||
              info.details.title ||
              info.details.original_name ||
              info.details.original_title}{" "}
            {info.details.release_date && <span className="text-xl font-bold text-zinc-300">
              ({info.details.release_date.split("-")[0]})
            </span>}
          </h1>
          <div className="flex gap-4 mt-5 items-center ">
            <div className="h-[6vh] w-[6vh] text-white bg-yellow-600 flex items-center justify-center rounded-full text-lg font-semibold ">
              {(info.details.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
            <h1 className="text-xl lg:text-2xl font-semibold">
              User <br /> Rating
            </h1>
            <h1 className="text-sm lg:text-base">{info.details.release_date}</h1>
            <h1 className="text-sm lg:text-base">
              {info.details.genres.map((value) => value.name).join(", ")}
            </h1>
            <h1 className="text-sm lg:text-base">{info.details.runtime} mins</h1>
          </div>

          {info.details.tagline && (
            <h1 className="text-2xl italic text-zinc-300 mt-3">
              "{info.details.tagline}"
            </h1>
          )}
          {info.details.overview && (
            <div>
              <h1 className="text-xl lg:text-2xl    mt-8 lg:mt-3">Overview</h1>
              <p className="mt-3 text-sm lg:text-base ">{info.details.overview}</p>
            </div>
          )}

          {info.translations && (
            <div>
              <h1 className="text-xl lg:text-2xl    mt-8 lg:mt-3 ">Available in </h1>
              <p className="mt-3 text-sm lg:text-base mb-8">
                {info.translations
                  .map((value) => value.english_name)
                  .join(", ")}
              </p>
            </div>
          )}

          <Link
            to={`${pathname}/trailer`} 
            className="lg:px-4 lg:py-3 px-3 py-2 text-lg  bg-[#e50914] rounded-lg font-semibold lg:text-xl hover:text-[#e50914] duration-300 hover:bg-white"
          >
            {" "}
            <i className="ri-play-fill mr-1"></i>Play Trailer
          </Link>
        </div>
      </div>

      {/* part - 3 Available on Platform */}
      <div className="mt-10 lg:mt-0 w-[80%] text-zinc-200 flex flex-col gap-5 px-[5%]">
        {info.watchProviders && info.watchProviders.flatrate && (
          <div className="flex gap-10 items-center">
            <h1>Available on Platforms</h1>
            {info.watchProviders.flatrate.map((value, index) => (
              <img
                key={index}
                className="rounded-md h-[6vh] w-[6vh]"
                src={`https://image.tmdb.org/t/p/original/${value.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.buy && (
          <div className="flex gap-10 items-center">
            <h1>Available to buy</h1>
            {info.watchProviders.buy.map((value, index) => (
              <img
                key={index}
                className="rounded-md h-[6vh] w-[6vh]"
                src={`https://image.tmdb.org/t/p/original${value.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.rent && (
          <div className="flex items-center gap-10">
            <h1>Available on Rent</h1>
            {info.watchProviders.rent.map((value, index) => (
              <img
                key={index}
                className="h-[6vh] w-[6vh] rounded-md "
                src={`https://image.tmdb.org/t/p/original/${value.logo_path}`}
                alt={`value.provider_name`}
              />
            ))}
          </div>
        )}
      </div>

      {/* part - top billed cast*/}
      <hr className="mt-16 mb-5 border-none h-[2px] bg-zinc-500" />
      <div className="px-[5%]  ">
        <h1 className="text-3xl  font-bold text-white mb-5 ">
          Top Billed Cast
        </h1>
        {info.credits.length >0 ?<HorizontalCards trending={info.credits}  /> : <h1 className="text-xl text-zinc-400">Data Not Available</h1>}
      </div>

      {/* part - 5 recommendation */}
      <div className="px-[5%] mt-16 ">
        <h1 className="text-3xl  font-bold text-white mb-5 ">
          Recommendations & Similar stuff
        </h1>
        {info.similar.length > 0 ? <HorizontalCards
          className="px-[5%]"
          trending={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />: <h1 className="text-xl text-zinc-400">Nothing to Show</h1>}
      </div>

      <Outlet/>
    </div>
  ) : (
    <Loader />
  );
};

export default MovieDetails;