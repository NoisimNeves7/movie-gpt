import React, { useEffect, useState } from 'react'
import Header from './template/Header'
import Dropdown from './template/Dropdown';
import axios from './utils/axios'
import VerticalCards from './template/VerticalCards';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './template/Loader';

const Tv = () => {
  const [tv, settv] = useState([]);
  const [category, setcategory] = useState('top_rated')
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)

  const getTv = async()=>{
    try {
      const {data} = await axios.get(`tv/${category}?page=${page}`)
      if(data.results.length > 0){
        settv(prev=>[...prev,...data.results])
      setpage(page+1)
      }
      else{
        sethasMore(false);
      }
    } catch (error) {
      console.log("error :"+error);
    }
  }
  
  const refreshHandler =()=>{
    if(tv.length === 0){
      getTv();
    }
    else{
      settv([])
      setpage(1)
      getTv();
    }
  }

  useEffect(()=>{
    refreshHandler()
  },[category])
  return tv.length>0 ? (
    <div className='w-screen h-screen'>
      <Header/>


      {/* ------------------------Navbar----------------------- */}
      <div className='w-[100%] lg:flex justify-between items-center text-zinc-400 mt-10 px-10 mb-10'>
      <h1 className='  lg:text-2xl mb-2 lg:mb-0 font-bold'>TV SHOW <span className='text-xs lg:text-base'>({ category.toUpperCase()})</span></h1>
        <Dropdown title={"Category"} options={['airing_today','on_the_air','popular','top_rated']} funct={(e)=>setcategory(e.target.value)}/>
      </div>


      {/* ---------------------------Cards------------------------- */}
      <InfiniteScroll
      dataLength={tv.length}
      next={getTv}
      hasMore={hasMore}
      loader={<h1>Loading....</h1>}
      >
      <VerticalCards data={tv} title={'tv'}/>
      </InfiniteScroll>




    </div>
  ): (<Loader/>)
}

export default Tv