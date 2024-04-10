import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncLoadPeople,removePeople } from "../store/actions/PeopleActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./template/Loader";
import noimage from "/noimage.jpg";
import HorizontalCards from "./template/HorizontalCards";
import Dropdown from "./template/Dropdown";

const PeopleDetails = () => {
  document.title = 'NEVES7 | Person Details'
  const { id } = useParams();
  // console.log(id);
  const dispatch = useDispatch();

  const { info } = useSelector((state) => state.people);
  // console.log(info);

  const navigate = useNavigate();

  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncLoadPeople({ id })); // Pass the id as an object
    return () => {
      dispatch(removePeople());
    };
  }, [id]);
  return info ? (
    <div className="w-screen h-screen  overflow-y-auto px-[7%] py-[2%] relative">
      {/* part - 1 NAVBAR  */}
      <nav className="text-zinc-200 flex items-center text-2xl gap-10 ">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#e50914] "
        ></i>
      </nav>

      {/* part - 2 Tv INFO */}
      <h1 className="text-zinc-400 lg:hidden text-5xl mt-5 font-black">
            {info.details.name}
          </h1>

      <div className="w-full lg:flex ">
        <div className="lg:w-[16%] mt-7 flex flex-col  ">
          <img
            className=" h-[40vh] w-full object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] "
            src={
              info.details.profile_path
                ? `https://image.tmdb.org/t/p/original/${info.details.profile_path}`
                : noimage
            }
            alt=""
          />

          <hr className="mt-7  border-none h-[1px] bg-zinc-500  mb-4" />
          <div className="flex text-2xl justify-between items-center text-white ">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`}
            >
              <i className="ri-global-line hover:text-[#e50914]"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalIds.instagram_id}/?hl=en`}
            >
              <i className="ri-instagram-line hover:text-[#e50914]"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalIds.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill hover:text-[#e50914]"></i>
            </a>
            <a
              target="_blank"
              href={`https://twitter.com/${info.externalIds.twitter_id}?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor`}
            >
              <i className="ri-twitter-x-line hover:text-[#e50914]"></i>
            </a>
          </div>
          <h1 className="text-2xl text-zinc-400 font-semibold  mt-3">
            Person Info
          </h1>

          <div>
            <h1 className="text-lg text-zinc-400 font-semibold mt-2">
              Known For
            </h1>
            <h1 className="text-md text-zinc-400 ">
              {info.details.known_for_department}
            </h1>
          </div>

          <div>
            <h1 className="text-lg text-zinc-400 font-semibold mt-2">Gender</h1>
            <h1 className="text-md text-zinc-400 ">
              {info.details.gender === 2 ? "Male" : "Female"}
            </h1>
          </div>

          <div>
            <h1 className="text-lg text-zinc-400 font-semibold mt-2">
              Birthday
            </h1>
            {info.details.birthday ? <h1 className="text-md text-zinc-400 ">{info.details.birthday}</h1> : <h1 className="text-md text-zinc-400 ">Don't have the data</h1>}
          </div>
{/* just trying to add env */}
          <div>
            <h1 className="text-lg text-zinc-400 font-semibold mt-2">
              Deathday
            </h1>
            <h1 className="text-md text-zinc-400 ">
              {info.details.deathday ? info.details.deathday : "Still Alive 😎"}
            </h1>
          </div>

          <div>
            <h1 className="text-lg text-zinc-400 font-semibold mt-2">
              Place Of Birth
            </h1>
            <h1 className="text-md text-zinc-400 ">
              {info.details.place_of_birth}
            </h1>
          </div>

          <div>
            <h1 className="text-lg text-zinc-400 font-semibold mt-2">
              Also Known As
            </h1>
            <h1 className="text-md text-zinc-400 ">
              {info.details.also_known_as.map((v, i) => (
                <span key={i}>{v}</span>
              ))}
            </h1>
          </div>
        </div>

        {/* right side */}
        <div className=" lg:w-[80%]  lg:p-10 ">
          <h1 className="text-zinc-400 hidden lg:block text-6xl font-black">
            {info.details.name}
          </h1>
          <div>
            <h1 className="text-xl text-zinc-400 font-semibold mb-6 mt-6">
              Biography
            </h1>
            {info.details.biography ? (
              <p className="text-zinc-400">{info.details.biography}</p>
            ) : (
              <p className="text-zinc-400">
                We don't have a biography for {info.details.name}.
              </p>
            )}
          </div>

{/* known For  */}
          <div className="mt-10 ">
            <h1 className="text-2xl font-bold text-zinc-400">Known For</h1>
            <HorizontalCards trending={info.combinedCredits.cast}/>
          </div>

          <div className="w-full ">
            <div className="flex justify-between mt-10">
              <h1 className="text-2xl font-bold text-zinc-400">Acting</h1>
              <Dropdown title={'Category'} options={['tv','movie']} funct={(e)=>setcategory(e.target.value)}/>
            </div>
            <div className="List-disc w-full h-[50vh] mt-10 shadow-2xl overflow-y-auto shadow-[rgba(255,255,255,.4)] border-2 border-zinc-700  text-zinc-400 p-4 relative">

 {info[category+'Credits'].cast.length>0?    info[category+'Credits'].cast.map((d,index)=>(
  <li  key={index} className="hover:text-white hover:bg-[#19191d]  duration-300 cursor-pointer p-5 rounded">
                <Link to={`/${category}/detail/${d.id}`}>
                <span>{d.name ||
              d.title ||
              d.original_name ||
              d.original_title}</span>
                {d.character && <p className="ml-5">Character Name: { d.character}</p>}
                </Link>
              </li>
)) : <h1 className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] text-5xl font-bold">Nothing To Show</h1>}
              
              
            </div>
          </div>
        </div>
      </div>

  
    </div>
  ) : (
    <Loader />
  );
};

export default PeopleDetails;