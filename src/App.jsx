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


const App = () => {

  const dispatch = useDispatch();
  const navigate =useNavigate();
  

useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const {uid,email,displayName,photoURL}= user;
      // console.log(user)
      dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
      navigate('/browse')
      
      
      // ...
    } else {
      // User is signed out
      // ...
      navigate('/')
      dispatch(removeUser())
    }
  });
},[])

  return (
    <div className='w-screen h-screen bg-[#1F1E24]'>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/browse' element={<Browse/>}/>
      <Route path='/trending' element={<Trending/>}/>
      <Route path='/tv' element={<Tv/>}/>
      <Route path='/person' element={<People/>}/>
      <Route path='/popular' element={<Popular/>}/>
      <Route path='/movie' element={<Movies/>}/>
      </Routes>
    </div>
  )
}

export default App