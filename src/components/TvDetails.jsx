import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadTv, removeTv } from "../store/actions/TvActions";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Loader from "./template/Loader";
import { FaWikipediaW } from "react-icons/fa";
import { SiImdb } from "react-icons/si";
import HorizontalCards from "./template/HorizontalCards";
import noimage from '/noimage.jpg'
// import NotFound from './template/NotFound'

const TvDetails = () => {

  document.title = 'Netflix | Tv Show Details'
  const { id } = useParams();
  // console.log(id)

  const { info } = useSelector((state) => state.tv);
  // console.log(info);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadTv({id}));

    return () => dispatch(removeTv());
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.4),rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
          info.details.backdrop_path || info.profile_path
        })`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
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

      {/* part - 2 Tv INFO */}
      <div className="w-full px-[5%] py-[3%] lg:flex gap-10">
        <img
          className="h-[70vh] lg:h-[60vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] "
          src={`https://image.tmdb.org/t/p/original/${info.details.poster_path}`}
          alt=""
        />
        <div className="text-white ">
          <h1 className="text-3xl lg:text-5xl   font-black">
            {info.details.name ||
              info.details.title ||
              info.details.original_name ||
              info.details.original_title}{" "}
            {info.details.first_air_date && (
              <span className="text-xl font-bold text-zinc-300">
                ({info.details.first_air_date.split("-")[0]})
              </span>
            )}
          </h1>
          <div className="flex gap-4 mt-5 items-center ">
            <div className="h-[6vh] w-[6vh] text-white bg-yellow-600 flex items-center justify-center rounded-full text-lg font-semibold ">
              {(info.details.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
            <h1 className=" text-xl lg:text-2xl font-semibold">
              User <br /> Rating
            </h1>
            <h1 className="text-sm lg:text-base">{info.details.first_air_date}</h1>
            <h1 className="text-sm lg:text-base">
              {info.details.genres.map((value) => value.name).join(", ")}
            </h1>
            <h1 className="text-sm lg:text-base">
              {info.details.number_of_seasons} Seasons
            </h1>
          </div>

          {info.details.tagline && (
            <h1 className="text-2xl italic text-zinc-300 mt-3">
              "{info.details.tagline}"
            </h1>
          )}
          {info.details.overview && (
            <div>
              <h1 className="text-xl lg:text-2xl    mt-8 lg:mt-3">Overview</h1>
              <p className="mt-3 text-sm lg:text-base">{info.details.overview}</p>
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
            to={`trailer`}
            className="lg:px-4 lg:py-3 px-3 py-2 text-lg  bg-[#e50914] rounded-lg font-semibold lg:text-xl hover:text-[#e50914] duration-300 hover:bg-white "
          >
            Play Trailer
          </Link>
        </div>
        <Outlet />
      </div>


      {/* part - 3 Available on Platform */}
      <div className="mt-10 lg:mt-0 w-[80%] text-zinc-200  px-[5%] flex flex-col gap-5">
        {info.watchProviders && info.watchProviders.flatrate &&
        <div className="flex gap-10 items-center">
          <h1>Available on Platforms</h1>
          {info.watchProviders.flatrate.map((value,index)=><img key={index} className="h-12 w-12 rounded-md" src={`https://image.tmdb.org/t/p/original/${value.logo_path}`} />)}
          </div>}
        
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

      

      {/* part 4 - top billed cast*/}
      <hr className="mt-16 mb-5 border-none h-[2px] bg-zinc-500" />
      <div className="px-[5%]  ">
        <h1 className="text-3xl  font-bold text-white mb-5 ">
          Series Cast
        </h1>
        <HorizontalCards trending={info.credits} />
      </div>

      {/* part 5 - Seasons*/}

      <div className="px-[5%] mt-16  ">
        <h1 className="text-3xl  font-bold text-white mb-5 ">
          Seasons
        </h1>
        {info.details.seasons ? <div className="flex overflow-y-hidden gap-10 ">
        {info.details.seasons.map((value,index)=>(
          <div key={index} className="min-w-[30vw] lg:min-w-[10vw]  ">
            <img className="w-[100%] h-[30vh] object-cover" src={value.poster_path ?`https://image.tmdb.org/t/p/original/${value.poster_path}`:noimage} alt="" />
            <h1 className="text-white mb-10 text-xl mt-3">{value.name}</h1>
          </div>
        ))}
        </div> :<h1>No Season Available</h1>
        }
      </div>

      {/* part - 6 recommendation */}
      <div className="px-[5%] mt-16 ">
        <h1 className="text-3xl  font-bold text-white mb-5 ">
          Recommendations & Similar stuff
        </h1>
        <HorizontalCards
          className="px-[5%]"
          trending={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div>





    </div>
  ) : (
    <Loader />
  );
};

export default TvDetails;