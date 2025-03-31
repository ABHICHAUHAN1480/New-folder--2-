import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, UserProfile } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';




const Navbar = ({ setCourse, settell, settell2,setHome }) => {
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [userprofile, setuserprofile] = useState(false)
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    useEffect(() => {
        const getsearch = async () => {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/User/getCourses?search=${query}`, {
                method: "Get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to get course");
            }          
            setResult(data.results);
        }
        const delayDebounceFn = setTimeout(() => {
            getsearch();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [query])

    const navigateToHome = () => {
        navigate("/");
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    };

    const handlehome=() => {
        setHome(true);
        settell(false);
        settell2(false);
    }
    const openSearch = async(index)=> {    
        const token = await getToken();
        const res =await fetch(`${import.meta.env.VITE_BACKEND_URL}/course/completion?courseCode=${result[index].courseCode}`, {
            method: "Get",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || "Failed to get course");
        } 
        if(data.msg==="found"){
            const courseCompletion = data.courseCompletion;
            const course = {
                ...result[index], 
                courseCompletion
            };
            setCourse(course); 
        }else{
            const courseCompletion =result[index].topics.map(topic => new Array(topic.subtopics.length).fill(0)); const course = {
                ...result[index], 
                courseCompletion
            };
            setCourse(course); 
        }  
        settell(true);
        settell2(true);
        setQuery("");
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
            : <nav className="bg-gray-900 p-4">

                <div className="container mx-auto flex justify-between items-center relative">
                    <div className="text-white text-4xl font-bold">CourseSeeker</div>
                    <div className="flex-col relative w-[100%] mx-auto">
                      
                        <div className="p-2 w-8/12 m-auto flex items-center bg-white rounded-md">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={query}
                                onChange={handleSearch}
                                className="p-2 w-full border rounded-md text-gray-900"
                            />
                            <lord-icon
                                src="https://cdn.lordicon.com/yudxjmzy.json"
                                trigger="loop"
                                colors="primary:#b4b4b4,secondary:#545454,tertiary:#000000"
                                style={{ width: 45, height: 45 }}
                            ></lord-icon>
                        </div>

                        {/* Search Results */}
                        {query.length > 0 && (
                            <div className="w-8/12 left-1/2 -translate-x-1/2  absolute z-10 bg-gray-800 text-white p-2 rounded-md mt-2">
                                {result.length > 0 ? (
                                    result.map((course, index) => (
                                        <div
                                            key={index}
                                            onClick={()=>openSearch(index)}
                                            className="p-2 hover:bg-gray-700 cursor-pointer rounded-md"
                                        >
                                            {course.courseName}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-2">No course found</div>
                                )}
                            </div>
                        )}
                    </div>

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
                                   
                                    <li className='text-white px-4 py-2 rounded-t hover:bg-gray-700 cursor-pointer' onClick={handlehome}>
                                        Home
                                    </li>

                                    <SignedIn>

                                        <li onClick={() => { setuserprofile(prev => !prev); }} className='text-white px-4 py-2 hover:bg-gray-700 cursor-pointer'>
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



                        {/* Desktop Menu (Sign In / Sign Out) */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Home - Visible only on desktop */}
                            <div className='text-white text-lg font-bold px-3 py-2 rounded cursor-pointer hover:bg-gray-700' onClick={handlehome}>
                                Home
                            </div>
                            <div className="hidden md:block text-white  rounded-full cursor-pointer  transition duration-300 ease-in-out" >

                                <lord-icon
                                    src="https://cdn.lordicon.com/ifsxxxte.json"
                                    trigger="loop"
                                    state="loop-cog"
                                    colors="primary:#e4e4e4"
                                    style={{ width: "35px", height: "35px" }}>
                                </lord-icon>
                            </div>

                            <SignedIn>
                                <UserButton />
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
