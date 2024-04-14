import React, { useEffect, useState } from 'react'
import Header from './template/Header'
import Dropdown from './template/Dropdown'
import VerticalCards from './template/VerticalCards'
import axios from './utils/axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './template/Loader'

const Movies = () => {
  document.title = 'Netflix Gpt | Movies'

  const [movie, setmovie] = useState([]);
  const [category, setcategory] = useState('now_playing')
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)

  const getMovie=async ()=>{
    try {
      const {data} = await axios.get(`movie/${category}?page=${page}`)
      if(data.results.length > 0 ){
        setmovie(prev=>[...prev,...data.results])
      setpage(page+1);
      }
      else{
        sethasMore(false);
      }
    } catch (error) {
      console.log("error : "+error);
    }
  }
  
  const refreshHandler =()=>{
    if(movie.length === 0){
      getMovie()
    }
    else{
      setmovie([])
      setpage(1)
      getMovie()
    
    }
  }

  useEffect(()=>{
    refreshHandler()
  },[category])



  return movie.length > 0 ? (
    <div className='w-screen h-screen'>
      <Header/>



       {/* -------------------------------Navbar--------------------------- */}
       <div className='w-[100%] lg:flex  justify-between items-center text-zinc-400 mt-10 px-10 mb-10'>
        <h1 className='  lg:text-2xl mb-2 lg:mb-0 font-bold'>MOVIE's <span className='text-xs lg:text-base'>({category==='now_playing' ? " CURRENTLY IN THEATRES " :category.toUpperCase()})</span></h1>
        <Dropdown title={"Category"} options={['popular','top_rated','upcoming','now_playing']} funct={(e)=>setcategory(e.target.value)}/>
      </div>



      {/* -----------------------------------CARDS----------------------------- */}
      <InfiniteScroll
      dataLength={movie.length}
      hasMore={true}
      next={getMovie}
      loader={<h1>Loading....</h1>}
      >
        <VerticalCards data={movie} title={'movie'}/>
      </InfiniteScroll>
      
    </div>

    
  ):(<Loader/>)
}

export default Movies