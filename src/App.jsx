import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Browse from './components/Browse';
import Trending from './components/Trending';
import Popular from './components/Popular';
import Tv from './components/Tv';
import People from './components/People';
import Movies from './components/Movies';
import TvDetails from './components/TvDetails';
import PeopleDetails from './components/PeopleDetails';
import MovieDetails from './components/MovieDetails';
import Trailer from './components/template/Trailer';
import NotFound from './components/template/NotFound';

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/browse',
      element: <Browse />
    },
    {
      path: '/trending',
      element: <Trending />
    },
    {
      path: '/tv',
      element: <Tv />,
      
    },
    
      {
        path: '/tv/detail/:id',
        element: <TvDetails />,
        children: [
          {
            path: 'trailer',
            element: <Trailer />
          }
        ]
      },
    
    {
      path: '/person',
      element: <People />
    },
    {
      path: '/person/detail/:id',
      element: <PeopleDetails />
    },
    {
      path: '/popular',
      element: <Popular />
    },
    {
      path: '/movie',
      element: <Movies />,
    },
      {
        path: 'movie/detail/:id',
        element: <MovieDetails />,
        children: [
          {
            path: 'trailer',
            element: <Trailer />
          }
        ]
      },
    {
      path: '*',
      element: <NotFound />
    }
  ]);

  return (
    <div className='bg-[#1F1E24]'>
      <RouterProvider router={appRouter}/>
    </div>
  );
};

export default Body;
