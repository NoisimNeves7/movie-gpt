import React from 'react'
import { Link,Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Browse from './components/Browse'

const App = () => {
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