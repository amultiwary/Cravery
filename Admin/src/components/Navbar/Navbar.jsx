import React from 'react'
import './navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="Cravery Logo" />
        <img className='profile' src={assets.profile_icon} alt="Profile" />
    </div>
  )
}

export default Navbar