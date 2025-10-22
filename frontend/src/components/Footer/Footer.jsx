import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
               {/* <img src={assets.logo} alt="" /> */}
               <p>Cravery is a modern food delivery web application inspired by platforms like Swiggy and Zomato.
It’s designed to let users browse foods, explore menus, and order food online with a sleek and responsive interface.</p>
               <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
               </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91XXXXXXXXXX</li>
                    <li>info@Cravery.com</li>
                </ul>

            </div>

        </div>
        <hr />
        <p className='footer-copyright'>Copyright © 2025 Cravery. All rights reserved &copy;</p>

    </div>
  )
}

export default Footer