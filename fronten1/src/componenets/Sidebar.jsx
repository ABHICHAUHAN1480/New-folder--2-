import { SignedIn, SignedOut } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'

const Sidebar = ({setopenaddcourse, settell, settell2, setIndex, course2, course3, setSubscribed,setHome}) => {
    const [myCourse, setMyCourse] = useState(false);
    const [subCourse, setSubCourse] = useState(false);
    return (<>
        <div className="lg:w-1/4 w-full h-[90%] bg-gray-900 overflow-scroll hide-scrollbar  border-gray-300 shadow-xl p-6   absolute ">
            <h2 className="text-3xl font-bold text-gray-200 mb-6">Get Your Courses</h2>

            <div className="flex flex-col gap-6">
                <SignedIn>
                    <div>
                        <div
                            onClick={() => setMyCourse((prev) => !prev)}
                            className={`p-4 w-full flex ${myCourse ? "bg-green-400" : "hover:bg-orange-100"} items-center justify-between border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50  transition duration-200 ease-in-out `}
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
                                {course2.map((course, index) => (
                                    <li
                                        key={index}

                                        onClick={() => {
                                            settell(true);
                                            settell2(false);
                                            setIndex(index);
                                            setSubscribed(false);
                                            setopenaddcourse(false);
                                        }}
                                        className="p-3 w-11/12 mx-auto hover:scale-105 border-2 border-gray-300 cursor-pointer hover:bg-orange-100 rounded-lg transition duration-150 ease-in-out"
                                    >
                                        {course.courseName}
                                    </li>
                                ))}
                                <li
                                 onClick={()=>{setopenaddcourse(true),settell(false),settell2(false),setHome(false)}}
                                 className=" bg-green-500 flex items-center justify-between w-11/12 mx-auto hover:scale-105 border-2 border-gray-300 cursor-pointer hover:bg-green-600 rounded-lg transition duration-150 ease-in-out">
                                    <span className='p-3'>Add new Course</span>
                                    <span className='mr-3 mt-1'><lord-icon
                                        src="https://cdn.lordicon.com/xojmodgf.json"
                                        trigger="hover"
                                        state="hover-draw"
                                        style={{width:35,height:35}}>
                                    </lord-icon></span>
                                </li>
                                {/* <button onClick={()=>console.log(course) }>click me</button> */}
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
                              {course3.length>0 ? (course3.map((course, index) => (
                                    <li
                                        key={index}

                                        onClick={() => {
                                            settell(true);
                                            settell2(false);
                                            setIndex(index);
                                            setSubscribed(true);
                                            setopenaddcourse(false);
                                        }}
                                        className="p-3 w-11/12 mx-auto hover:scale-105 border-2 border-gray-300 cursor-pointer hover:bg-orange-100 rounded-lg transition duration-150 ease-in-out"
                                    >
                                        {course.courseName}
                                    </li>
                                ))):<li  className="p-3 w-11/12 mx-auto bg-red-500 rounded-lg">No Subscribed Courses</li>}
                            </ul>
                        )}
                    </div></SignedIn>
                <SignedOut><div className='text-gray-200 m-auto p-4 bg-gray-400 bg-opacity-25 rounded-sm'>You need to Log in first</div> </SignedOut>
            </div>
        </div></>
    );
};

export default Sidebar;
