import React, { useEffect } from 'react'
import { Link,Routes, Route,useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Browse from './components/Browse'
import { auth } from './components/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import {useDispatch} from 'react-redux'
import { addUser, removeUser } from './store/reducers/userSlice'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Tv from './components/Tv'
import People from './components/People'
import Movies from './components/Movies'
import TvDetails from './components/TvDetails'
import PeopleDetails from './components/PeopleDetails'
import MovieDetails from './components/MovieDetails'
import Trailer from './components/template/Trailer'
import NotFound from './components/template/NotFound'


const App = () => {

  const dispatch = useDispatch();
  const navigate =useNavigate();
  

useEffect(()=>{
  const unsubscribe= onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, email, displayName, photoURL } = user;
      dispatch(
        addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        })
      );
      console.log(window.location.pathname)
      if (window.location.pathname === "/") {
        
        navigate("/browse");
      }
      
    } else {
      // User is signed out
      dispatch(removeUser());
      navigate("/");
    }
  });

  return () => unsubscribe();
},[])

  return (
    <div className='w-screen h-screen bg-[#1F1E24]'>
      
      {/* {userSignedOut && <Redirect to='/' />} */}
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/browse' element={<Browse/>}/>
      <Route path='/trending' element={<Trending/>}/>
      <Route path='/tv' element={<Tv/>}/>
      <Route path='/tv/detail/:id' element={<TvDetails/>}>
        <Route path='/tv/detail/:id/trailer' element={<Trailer/>} />
      </Route>
      <Route path='/person' element={<People/>}/>
      <Route path='/person/detail/:id' element={<PeopleDetails/>}/>
      <Route path='/popular' element={<Popular/>}/>
      <Route path='/movie' element={<Movies/>}/>
      <Route path='/movie/detail/:id' element={<MovieDetails/>}>
        <Route path='/movie/detail/:id/trailer' element={<Trailer/>} />
      </Route>
      <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App