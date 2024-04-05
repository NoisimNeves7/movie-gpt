import React, { useEffect } from 'react'
import { Link,Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Browse from './components/Browse'
import { auth } from './components/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import {useDispatch} from 'react-redux'
import { addUser, removeUser } from './store/reducers/userSlice'

const App = () => {

  const dispatch = useDispatch();
  

useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const {uid,email,displayName}= user;
      dispatch(addUser({uid:uid,email:email,displayName:displayName}))
      
      
      // ...
    } else {
      // User is signed out
      // ...
      dispatch(removeUser())
    }
  });
},[])

  return (
    <div className='w-screen h-screen bg-[#1F1E24]'>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/browse' element={<Browse/>}/>
      </Routes>
    </div>
  )
}

export default App