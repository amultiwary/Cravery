import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import Order from './pages/Orders/Orders.jsx'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify';
const App = () => {
  const url = import.meta.env.VITE_URL;
  return (
    <div>
      <ToastContainer />
      <Navbar /> 
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Order url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App