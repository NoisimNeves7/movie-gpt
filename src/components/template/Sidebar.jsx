import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '/logo.png'
import { useSelector } from 'react-redux';
import axios from '../utils/axios'
import noimage from '/noimage.jpg'

const SideBar = () => {
    const [menu, setmenu] = useState(false);
    const getMenu = ()=>{
        setmenu(state=>!state)
        // console.log(!menu)
    }


// ----------------------searchbar code--------------------------
const user = useSelector((state) => state.user);
const [query, setquery] = useState("");
const [searches, setsearches] = useState([]);


const getSearches = async () => {
  const { data } = await axios.get(`/search/multi?query=${query}`);
  setsearches(data.results);
  // console.log(searches)
};




useEffect(() => {
  getSearches();
}, [query]);



  return (
    
        <div className='absolute  lg:static w-full lg:w-[21%]  lg:h-full   '>
            {/* laptop view */}
            <div className='hidden lg:block w-full h-full  border-r-2 border-zinc-400 py-8 px-10 ' >
            
            <h1 className='text-xl text-white font-semibold  mb-5'>New Feeds</h1>
            <nav className='flex flex-col text-zinc-400 text-xl gap-4'>
                <Link to={'/trending'} className='p-3 text-xl hover:bg-[#e50914] hover:rounded-lg hover:text-white duration-300 '><i className="mr-3 ri-fire-fill"></i>Trending</Link>
                <Link to={'/popular'} className='p-3 text-xl hover:bg-[#e50914] hover:rounded-lg hover:text-white duration-300 '><i className="mr-3 ri-sparkling-2-fill"></i>Popular</Link>
                <Link to={'/movie'} className='p-3 text-xl hover:bg-[#e50914] hover:rounded-lg hover:text-white duration-300 '><i className="mr-3 ri-clapperboard-fill"></i>Movies</Link>
                <Link to={'/tv'} className='p-3 text-xl hover:bg-[#e50914] hover:rounded-lg hover:text-white duration-300 '><i className="mr-3 ri-tv-2-fill"></i>TV Shows</Link>
                <Link to={'/person'} className='p-3 text-xl hover:bg-[#e50914] hover:rounded-lg hover:text-white duration-300 '><i className="mr-3 ri-team-fill"></i>People</Link>
            </nav>
            
            
            
        </div>

        {/* Mobile view  */}
        <div className='lg:hidden text-zinc-400 bg-[#1F1E24] z-[11] absolute  flex justify-between w-full px-5 py-2 text-2xl'>
        







        {user.value && (
        <div className=" lg:hidden flex items-center gap-2 text-lg  text-zinc-400 w-[90%] ">
          {/* ----------------SEARCH BAR---------------------- */}
          <i className="ri-search-line  "></i>
          <input
            onChange={(e) => setquery(e.target.value)}
            value={query}
            type="text"
            className="outline-none w-full bg-[#1F1E24] text-white"
            placeholder="Search Move,Tv Show ,Person...."
          />
          {query && (
            <i
              onClick={() => setquery("")}
              className="ri-close-large-fill hover:text-[#E50914]"
            ></i>
          )}
        </div>
      )}

      {/* ---------------------SEARCH RESULT------------------------ */}
      {query && (
        <div className="lg:hidden flex items-center   gap-2 text-lg text-zinc-400 w-[80%] h-[50vh] rounded absolute top-[100%] left-[10%]  bg-zinc-200 flex-col overflow-y-auto z-[10]">
          {searches.map((value, index) => {
            return (
              <Link
                to={`/${value.media_type}/detail/${value.id}`}
                key={index}
                className="border-b-2 border-zinc-100 p-8  w-[100%] text-zinc-600 flex  items-center justify-start text-lg font-semibold hover:bg-zinc-300 hover:text-black duration-300"
              >
                <img
                  className="h-[10vh] w-[10vh] object-cover rounded mr-5"
                  src={
                    value.backdrop_path || value.profile_path
                      ? `https://image.tmdb.org/t/p/original/${
                          value.backdrop_path || value.profile_path
                        }`
                      : noimage
                  }
                  alt=""
                />
                <span>
                  {value.name ||
                    value.title ||
                    value.original_name ||
                    value.original_title}
                </span>
              </Link>
            );
          })}
        </div>
      )}

















        
        <i onClick={()=>getMenu()} className="ri-menu-line ">
            
        </i>
        <div className={` ${!menu && 'hidden '} duration-300 py-2 px-4 absolute left-[80%] top-[100%] rounded-lg -translate-x-[50%] text-lg bg-[#e50914] flex flex-col  text-white  justify-center items-center gap-2 border-[2px] border-white z-[12]`}>


            
            <Link to={'/trending'} className='hover:text-zinc-300 px-3 py-2 rounded-lg bg-[#1F1E24]'>Trending</Link>
            <Link to={'/popular'}  className='hover:text-zinc-300 px-3 py-2 rounded-lg bg-[#1F1E24]'>Popular</Link>
            <Link to={'/movie'} className='hover:text-zinc-300 px-3 py-2 rounded-lg bg-[#1F1E24]'>Movies</Link>
            <Link to={'/tv'} className='hover:text-zinc-300 px-3 py-2 rounded-lg bg-[#1F1E24]'>TV </Link>
            <Link to={'/person'} className='hover:text-zinc-300 px-3 py-2 rounded-lg bg-[#1F1E24]'>People</Link>
            
        </div>

        

        </div>
        </div>
  )
}

export default SideBar