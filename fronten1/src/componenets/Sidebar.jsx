import { SignedIn, SignedOut } from '@clerk/clerk-react';
import React, { useState } from 'react'

const Sidebar = ({handleAddCourse,setIndex}) => {
    const [myCourse, setMyCourse] = useState(false);
    const [subCourse, setSubCourse] = useState(false);

    return (<>
        <div className="lg:w-1/4 w-full min-h-[90vh] bg-gray-900  border-gray-300 shadow-xl p-6   absolute ">
            <h2 className="text-3xl font-bold text-gray-200 mb-6">Get Your Courses</h2>

            <div className="flex flex-col gap-6">
            <SignedIn>
                <div>
                    <div
                        onClick={() => setMyCourse((prev) => !prev)}
                        className={`p-4 w-full flex ${myCourse?"bg-green-400":"hover:bg-orange-100"} items-center justify-between border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50  transition duration-200 ease-in-out `}
                    >
                        <span className="text-xl font-semibold text-gray-700">My Courses</span>
                        <lord-icon
                            src="https://cdn.lordicon.com/wjlyhulz.json"
                            trigger="click"
                            colors="primary:#4a5568"
                            style={{ width: "30px", height: "30px" }}
                        ></lord-icon>
                    </div>
                  
                    {myCourse && (
                        <ul className="w-full mt-3 flex flex-col py-4 gap-3 bg-gray-50 rounded-lg">
                            {['Course 1', 'Course 2', 'Course 3', 'Course 4'].map((course, index) => (
                                <li
                                    key={index}
                                    
                                    onClick={() => {
                                        setIndex(index);  
                                        handleAddCourse(); 
                                    }}
                                    className="p-3 w-11/12 mx-auto hover:scale-105 border-2 border-gray-300 cursor-pointer hover:bg-orange-100 rounded-lg transition duration-150 ease-in-out"
                                >
                                    {course}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                

                <div>
                    <div
                        onClick={() => setSubCourse((prev) => !prev)}
                        className="p-4 w-full flex items-center justify-between border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-orange-100 transition duration-200 ease-in-out"
                    >
                        <span className="text-xl font-semibold text-gray-700">Subscribed Courses</span>
                        <lord-icon
                            src="https://cdn.lordicon.com/wjlyhulz.json"
                            trigger="click"
                            colors="primary:#4a5568"
                            style={{ width: "30px", height: "30px" }}
                        ></lord-icon>
                    </div>
                    {subCourse && (
                        <ul className="w-full mt-3 flex flex-col py-4 gap-3 bg-gray-50 rounded-lg">
                            {['Subcourse 1', 'Subcourse 2', 'Subcourse 3', 'Subcourse 4', 'Subcourse 5'].map((subcourse, index) => (
                                <li
                                    key={index}
                                    className="p-3 w-11/12 mx-auto hover:scale-105 border-2 border-gray-300 cursor-pointer hover:bg-orange-100 rounded-lg transition duration-150 ease-in-out"
                                >
                                    {subcourse}
                                </li>
                            ))}
                        </ul>
                    )}
                </div></SignedIn>
                <SignedOut><div className='text-gray-200 m-auto p-4 bg-gray-400 bg-opacity-25 rounded-sm'>You need to Log in first</div> </SignedOut>
            </div>
        </div></>
    );
};

export default Sidebar;
