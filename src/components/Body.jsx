// import React from 'react'
// import { createBrowserRouter } from 'react-router-dom';
// import Trending from './components/Trending'
// import Popular from './components/Popular'
// import Tv from './components/Tv'
// import People from './components/People'
// import Movies from './components/Movies'
// import TvDetails from './components/TvDetails'
// import PeopleDetails from './components/PeopleDetails'
// import MovieDetails from './components/MovieDetails'
// import Trailer from './components/template/Trailer'
// import NotFound from './components/template/NotFound'


// const Body = () => {
    

// const appRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <Login />
//   },
//   {
//     path: '/browse',
//     element: <Browse />
//   },
//   {
//     path: '/trending',
//     element: <Trending />
//   },
//   {
//     path: '/tv',
//     element: <Tv />,
//     children: [
//       {
//         path: 'detail/:id',
//         element: <TvDetails />,
//         children: [
//           {
//             path: 'trailer',
//             element: <Trailer />
//           }
//         ]
//       }
//     ]
//   },
//   {
//     path: '/person',
//     element: <People />
//   },
//   {
//     path: '/person/detail/:id',
//     element: <PeopleDetails />
//   },
//   {
//     path: '/popular',
//     element: <Popular />
//   },
//   {
//     path: '/movie',
//     element: <Movies />,
//     children: [
//       {
//         path: 'detail/:id',
//         element: <MovieDetails />,
//         children: [
//           {
//             path: 'trailer',
//             element: <Trailer />
//           }
//         ]
//       }
//     ]
//   },
//   {
//     path: '*',
//     element: <NotFound />
//   }
// ]);
//   return (
//     <>
//     <RouterProvider router={appRouter}/>
//     </>
//   )
// }

// export default Body