import React from 'react'
import Navbar from '../componenets/Navbar'
import { useState } from 'react'
import Sidebar from '../componenets/Sidebar'
const Home = () => {
  
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className='z-10'>
            <Sidebar/>
            </div>
        </div>
    )
}

export default Home
