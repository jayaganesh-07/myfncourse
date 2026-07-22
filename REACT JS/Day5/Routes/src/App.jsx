import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import NavBar from './component/NavBar'
import Home from './component/Home'
import About from './component/About'
import Contact from './component/Contact'

const App = () => {
  return (
    <>
    <NavBar/>
    <Routes>

      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      
      


      
    </Routes>
    
    
    </>
  )
}

export default App