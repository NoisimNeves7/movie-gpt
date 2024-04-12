import React, { useEffect, useState } from 'react'
import Header from './template/Header'
import Dropdown from './template/Dropdown'
import axios from './utils/axios'
import VerticalCards from './template/VerticalCards';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './template/Loader';

const Popular = () => {
  const [popular, setpopular] = useState([]);
  const [category, setcategory] = useState("movie")
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)

  const getPopular = async()=>{
    try {
      const {data} = await axios.get(`${category}/popular?page=${page}`)
      if(data.results.length > 0){
        setpopular((prev)=>[...prev,...data.results]);
      setpage(page+1);
      }
    } catch (error) {
      console.log("error : " + error)
    }
  }

  const refreshHandler =()=>{
    if(popular.length===0){
      getPopular();
    }
    else{
      setpopular([]);
      setpage(1);
      getPopular();

    }
  }
  
  // console.log(popular)
  useEffect(()=>{
    refreshHandler()
  },[category])
  return popular.length > 0 ? (
    <div className='w-screen h-screen'>
      <Header/>

      {/* -------------------------------Navbar--------------------------- */}
      <div className='w-[100%] flex justify-between items-center text-zinc-400 mt-10 px-10 mb-10'>
        <h1 className='  lg:text-2xl font-bold'>POPULAR {category.toUpperCase()}{category==='tv' ? " SHOW's" :"'s"}</h1>
        <Dropdown title={"Category"} options={['tv','movie']} funct={(e)=>setcategory(e.target.value)}/>
      </div>

      {/* -----------------------------------Cards---------------------------- */}
      <InfiniteScroll
      dataLength={popular.length}
      next={getPopular}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      >
      <VerticalCards data={popular} title={category}/>
      </InfiniteScroll>




    </div>
  ):(<Loader/>)
}

export default Popular