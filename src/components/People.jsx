import React, { useEffect, useState } from 'react'
import Header from './template/Header'
import Dropdown from './template/Dropdown';
import axios from './utils/axios'
import VerticalCards from './template/VerticalCards';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './template/Loader';

const People = () => {
  const [people, setpeople] = useState([]);
  
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)

  const getTv = async()=>{
    try {
      const {data} = await axios.get(`person/popular`)
      if(data.results.length > 0){
        setpeople(prev=>[...prev,...data.results])
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
    if(people.length === 0){
      getTv();
    }
    else{
      setpeople([])
      setpage(1)
      getTv();
    }
  }

  useEffect(()=>{
    refreshHandler()
  },[])
  return people.length>0 ? (
    <div className='w-screen h-screen'>
      <Header/>


      {/* ------------------------Navbar----------------------- */}
      <div className='w-[100%] flex justify-between items-center text-zinc-400 mt-10 px-10 mb-10'>
      <h1 className='  text-2xl font-bold'>POPULAR PERSONS </h1>
        
      </div>


      {/* ---------------------------Cards------------------------- */}
      <InfiniteScroll
      dataLength={people.length}
      next={getTv}
      hasMore={hasMore}
      loader={<h1>Loading....</h1>}
      >
      <VerticalCards data={people} title={'person'}/>
      </InfiniteScroll>




    </div>
  ): (<Loader/>)
}

export default People