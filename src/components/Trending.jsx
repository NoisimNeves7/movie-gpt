import React, { useEffect, useState } from "react";
import Header from "./template/Header";
import Dropdown from "./template/Dropdown";
import axios from "./utils/axios";
import VerticalCards from "./template/VerticalCards";
import Loader from "./template/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  document.title = 'Netflix Gpt | Trending'
  const [trending, settrending] = useState([]);
  const [category, setcategory] = useState("all");
  const [timeFrame, settimeFrame] = useState("week");
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `trending/${category}/${timeFrame}?page=${page}`
      );

      // settrending(data.results)
      // setpage(page+1);

      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("error :" + error);
    }
  };

  const refreshHandler = () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      settrending([]);
      setpage(1);
      getTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, timeFrame]);
  return trending.length > 0 ? (
    <div className="w-full h-screen  ">
      <Header />

      {/* ------------------------NAVBAR------------------------------- */}
      <div className="  w-[100%] lg:flex justify-between   items-center text-zinc-400 mt-10 px-10 mb-10">
        <Dropdown
          title={"Category"}
          options={["movie", "tv", "all"]}
          funct={(e) => setcategory(e.target.value)}
        />
        <h1 className="lg:text-2xl font-bold mt-5 mb-5 lg:mt-0 lg:mb:0">
          TRENDING {category === "tv" && "ON "}
          {category.toUpperCase()} {timeFrame === "week" ? "THIS " : "TO"}
          {timeFrame.toUpperCase()}{" "}
        </h1>
        <Dropdown
          title={"Timeframe"}
          options={["day", "week"]}
          funct={(e) => settimeFrame(e.target.value)}
        />
      </div>

      {/* ------------------------------CARDS------------------------------- */}

      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <VerticalCards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Trending;
