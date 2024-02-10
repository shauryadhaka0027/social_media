import React from 'react'
import style from "../css/Navbar.module.css"
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div style={{display:"flex",justifyContent:"space-evenly"}}>
      <div><Link to="/">HomePage</Link></div>
      <div><Link to="/login">Login</Link></div>
      <div><Link to="signup">Signup</Link></div>
      <div><Link to="post">Post</Link></div>
    </div>
  )
}

export default Navbar
