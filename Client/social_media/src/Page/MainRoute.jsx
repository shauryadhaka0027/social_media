import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Posts from './Posts'
import Homepage from "./Homepage"

const MainRoute = () => {
  return (
    <div>
       <Routes>
          <Route exact path="/"   element={<Homepage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/posts" element={<Posts/>} />

    
    </Routes>
    </div>
  )
}

export default MainRoute
