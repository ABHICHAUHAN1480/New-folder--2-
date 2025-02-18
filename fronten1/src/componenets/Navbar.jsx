import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, UserProfile } from '@clerk/clerk-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { useState } from 'react';



const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
  const [userprofile, setuserprofile] = useState(false)
    const navigateToHome = () => {
        navigate("/");
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (<>
     {userprofile ? 
    <div className='flex flex-col mt-4 items-center'>
    <UserProfile />
    <button 
      onClick={() => { setuserprofile(prev => !prev); }} 
      className='mt-4 px-4 py-2 mb-4 bg-gray-700 text-white rounded hover:bg-gray-600'
    >
      Close
    </button>
  </div>
     : <nav className="bg-gray-800 p-4">
           
           <div className="container mx-auto flex justify-between items-center relative">
               <div className="text-white text-4xl font-bold">CourseSeeker</div>


               <div className="flex items-center space-x-4">

                   <div className="md:hidden relative">
                       <IoMdMenu
                           className="text-white text-3xl cursor-pointer"
                           onClick={toggleMenu}
                       />

                       {/* Dropdown Menu for Mobile */}
                       <div className={`absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg transition-all duration-300 ease-in-out 
                                       ${menuOpen ? 'block' : 'hidden'}`}>
                           <ul className="flex flex-col">
                               {/* Home for Mobile */}
                               <li className='text-white px-4 py-2 rounded-t hover:bg-gray-700 cursor-pointer' onClick={navigateToHome}>
                                   Home
                               </li>

                               <SignedIn>

                                   <li  onClick={() => { setuserprofile(prev => !prev); }} className='text-white px-4 py-2 hover:bg-gray-700 cursor-pointer'>
                                My profile
                                   </li>
                               </SignedIn>

                               <SignedOut>
                                   <li className='text-white px-4 py-2 hover:bg-gray-700 cursor-pointer'>
                                       <SignInButton>
                                           <span>Sign In</span>
                                       </SignInButton>
                                   </li>
                               </SignedOut>

                               {/* Settings for Mobile */}
                               <li className='text-white px-4 py-2 hover:bg-gray-700 cursor-pointer'>
                                   {/* <IoSettingsOutline className='inline-block mr-2 text-xl' /> */}
                                   Settings
                               </li>
                           </ul>
                       </div>
                   </div>

                   {/* Settings Icon - Always Visible on Desktop */}


                   {/* Desktop Menu (Sign In / Sign Out) */}
                   <div className="hidden md:flex items-center space-x-4">
                       {/* Home - Visible only on desktop */}
                       <div className='text-white text-lg font-bold px-3 py-2 rounded cursor-pointer hover:bg-gray-700' onClick={navigateToHome}>
                           Home
                       </div>
                       <div className="hidden md:block text-white  rounded-full cursor-pointer  transition duration-300 ease-in-out" >
                         
                           <lord-icon
                               src="https://cdn.lordicon.com/ifsxxxte.json"
                               trigger="loop"
                               state="loop-cog"
                               colors="primary:#e4e4e4"
                               style={{width:"35px",height:"35px"}}>
                           </lord-icon>
                       </div>

                       <SignedIn>
                       <UserButton/>
                       </SignedIn>

                       <SignedOut>
                           <SignInButton>
                               <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Sign In</button>
                           </SignInButton>
                       </SignedOut>
                   </div>
               </div>
           </div>
       </nav>}
       
        </>
    );
};


export default Navbar;
