import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Route ,Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/cart/cart';
import Footer from './components/Footer/Footer';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/verify/Verify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {
  
  const [showLogin,setShowLogin]=useState(false);


  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    {showLogin?<LoginPopup  setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrders />} />

      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App