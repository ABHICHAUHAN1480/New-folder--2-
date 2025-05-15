import React from 'react'
import Navbar from '../componenets/Navbar'
import { useState, useEffect } from 'react'
import Sidebar from '../componenets/Sidebar'
import CourseArea from '../componenets/CourseArea'
import { useAuth, useUser } from '@clerk/clerk-react'
import AddCourse from '../componenets/AddCourse'
import Homecards from '../componenets/Homecards'
const Home = () => {
    const { getToken } = useAuth();
    const [home, setHome] = useState(true);
    const [course, setCourse] = useState([]);
    const [course3, setCourse3] = useState([]);
    const [tell, settell] = useState(false);
    const [tell2, settell2] = useState(false);
    const [index, setIndex] = useState(null);
    const [course2, setCourse2] = useState([]);
    const [openaddcourse, setopenaddcourse] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        handleAddCourse();
        enrolledcourses();
    }, [])

    const handleAddCourse = async () => {
        setloading(true);
        const token = await getToken();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/temp/getCourses`, {
            method: "Get",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (!res.ok) {
            setloading(false);
            throw new Error(data.message || "Failed to get course");
        }
        setCourse(data);
        setCourse2(data);
        setloading(false);
    };
    const enrolledcourses = async () => {
        setloading(true);
        const token = await getToken();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/User/enrolledcourses`, {
            method: "Get",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (!res.ok) {
            setloading(false);
            throw new Error(data.message || "Failed to get course");
        }
        setCourse3(data);
        setloading(false);
    }
    const { user, isSignedIn } = useUser();

    useEffect(() => {
        if (isSignedIn) {
            checkFirstTimeUser();
        }
    }, [isSignedIn]);




    const checkFirstTimeUser = async () => {
        setloading(true);
        if (!user) return;

        const token = await getToken();

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/User/addUser`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        setloading(false);

        const data = await response.json();
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center gap-4">
                        <lord-icon
                            src="https://cdn.lordicon.com/dupxuoaa.json"
                            trigger="loop"
                            state="loop-transparency"
                            colors="primary:#ffffff"
                            style={{ width: 80, height: 80 }}
                        ></lord-icon>
                        <span className="text-white text-lg font-medium">Loading, please wait...</span>
                    </div>
                </div>
            )}
            <Navbar setCourse={setCourse2} settell={settell} settell2={settell2} setHome={setHome} />
            <div className='-z-10'>
                <Sidebar course2={course} course3={course3} setSubscribed={setSubscribed} setopenaddcourse={setopenaddcourse} settell={settell} settell2={settell2} setHome={setHome} setIndex={setIndex} />
            </div>

            {
                tell ? (
                    !tell2 ? (
                        subscribed ? (
                            course3.length > 0 && index !== null ? ((course3.length > index ?
                                <div className='z-10'><CourseArea course={course3[index]} setCourse3={setCourse3} /></div> : <div className='z-10'><CourseArea course={course3[index - 1]} setCourse3={setCourse3} /></div>)
                            ) : (
                                <div className='w-3/4 p-4 bg-opacity-95 flex text-white cursor-default bg-gray-800 absolute right-0 h-[90vh] overflow-y-auto'>
                                    <div className='p-4 border-y-2 border-gray-300 text-4xl w-10/12 text-center m-auto bg-white bg-opacity-25 rounded-md font-extrabold'>No Enrolled Courses</div>
                                </div>
                            )
                        ) : (
                            course.length > 0 && index !== null ? ((course.length > index ?
                                <div className='z-10'><CourseArea course={course[index]} setCourse3={setCourse} /></div> : <div className='z-10'><CourseArea course={course[index - 1]} setCourse3={setCourse} /></div>)
                            )  : (
                                <div className='w-3/4 p-4 bg-opacity-95 flex text-white cursor-default bg-gray-800 absolute right-0 h-[90vh] overflow-y-auto'>
                                    <div className='p-4 border-y-2 border-gray-300 text-4xl w-10/12 text-center m-auto bg-white bg-opacity-25 rounded-md font-extrabold'>No Owned  Courses</div>
                                </div>
                            )
                        )
                    ) : (
                        <div className='z-10'><CourseArea course={course2} setCourse3={setCourse3} /></div>
                    )
                ) : (home &&
                    <div className='w-3/4 p-4 bg-opacity-95 flex text-white cursor-default bg-gray-800 absolute right-0 h-[90vh] overflow-y-auto'>
                        <Homecards setCourse={setCourse2} setHome={setHome} settell={settell} settell2={settell2} />
                    </div>
                )
            }

            {!(tell || tell2 || home) &&
                (openaddcourse && <AddCourse />)
            }
        </div>
    )
}

export default Home
