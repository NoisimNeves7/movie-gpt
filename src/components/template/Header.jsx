import React, { useEffect, useState } from 'react'
import logo from '/logo.png'
import {Link} from 'react-router-dom'
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import {  useSelector } from "react-redux";
import { Multi_language, userDefaulltImage } from '../utils/constants';
import axios from '../utils/axios'
import noimage from '/noimage.jpg'
import { toggleGptSearchView } from '../../store/reducers/gptSlice';
import {useDispatch} from 'react-redux'
import { changeLanguage } from '../../store/reducers/configSlice';

const Header = () => {

  const dispatch = useDispatch();
  
  const user  = useSelector(state=>state.user);
  const gptStatus = useSelector(state=>state.gpt.value)
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const getSearches = async()=>{
    const {data} = await axios.get(`/search/multi?query=${query}`)
    setsearches(data.results)
    // console.log(searches)
  }

  // console.log(query);

  // console.log(user.value)

 

  //----------------------------------SIGN OUT CODE------------------------------
const handleSignOutClick =()=>{

signOut(auth).then(() => {
  // Sign-out successful.
  console.log(user.length)
  
}).catch((error) => {
  // An error happened.

});
}

useEffect(()=>{
  getSearches()
},[query])
  
  return (
    <div className={`flex justify-between relative w-full h-[10%] px-20 ${user.value && 'border-b-[0.2px] border-zinc-500'}`} >
        <Link to={'/browse'}><img src={logo} className='w-44 ' alt="" /></Link>

        {user.value && <div className=' flex items-center gap-2 text-lg text-zinc-400 w-[35%] '>

          {/* ----------------SEARCH BAR---------------------- */}
        <i className="ri-search-line  "></i>
         <input onChange={(e)=>setquery(e.target.value)} value={query} type="text" className='outline-none w-full bg-[#1F1E24] text-white' placeholder='Search Move,Tv Show ,Person....' />
         {query && <i onClick={()=>setquery("")} className="ri-close-large-fill hover:text-[#E50914]"></i>}
        </div>
        }
        


        {/* ---------------------SEARCH RESULT------------------------ */}
        {query &&  <div className=' flex items-center gap-2 text-lg text-zinc-400 w-[30%] h-[50vh] rounded absolute top-[100%] left-[34%]  bg-zinc-200 flex-col overflow-y-auto z-[10]'>
          {searches.map((value,index)=>{
            return <Link
            to={`/${value.media_type}/detail/${value.id}`}
              key={index}
              className="border-b-2 border-zinc-100 p-8  w-[100%] text-zinc-600 flex  items-center justify-start text-lg font-semibold hover:bg-zinc-300 hover:text-black duration-300"
            >
              <img
                className="h-[10vh] w-[10vh] object-cover rounded mr-5"
                src={value.backdrop_path || value.profile_path ? `https://image.tmdb.org/t/p/original/${
                  value.backdrop_path || value.profile_path
                }` : noimage}
                alt=""
              />
              <span>
                {value.name ||
                  value.title ||
                  value.original_name ||
                  value.original_title}
              </span>
            </Link>
          })}

</div> }
        
        

        {user.value && <div className='flex text-white  items-center gap-10 '>



          {gptStatus && <select name="Language" id="" onChange={(e)=>dispatch(changeLanguage(e.target.value))}>
            {Multi_language.map((value,index)=><option key={index} value={value.identifier}>{value.name}</option>)}
            
          </select>}
          <button onClick={()=>dispatch(toggleGptSearchView())} className='px-3 py-2 bg-purple-700 text-white rounded-lg font-bold hover:text-purple-700 hover:bg-white duration-300'>{!gptStatus ? 'Gpt Search':'Home'}</button>
        <p className='text-white text-lg font-bold'>{user.value.displayName}</p> 
          <img className='w-14 h-14 object-cover rounded-2xl' src={user.value.photoURL ? user.value.photoURL : userDefaulltImage } alt="" />
          <button className='text-sm' onClick={()=>handleSignOutClick()} >Log Out</button>



        </div>}
    </div>
  )
}

export default Header