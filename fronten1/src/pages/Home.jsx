import React from 'react'
import Navbar from '../componenets/Navbar'
import { useState,useEffect } from 'react'
import Sidebar from '../componenets/Sidebar'
import CourseArea from '../componenets/CourseArea'
import { useAuth ,useUser} from '@clerk/clerk-react'
const Home = () => {
    const { getToken } = useAuth();
    const [course, setCourse] = useState([]);
    const [tell, settell]=useState(false);
    const [index, setIndex] = useState(null);
    const handleAddCourse = async () => {
          const token = await getToken();
            const res = await fetch("http://localhost:3001/temp/getCourses", {
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
            setCourse(data);
            settell(true);
    };
    const { user, isSignedIn } = useUser();

    useEffect(() => {
        if (isSignedIn) {
            checkFirstTimeUser(); // Call only when user is signed in
        }
    }, [isSignedIn]); 

    const checkFirstTimeUser = async () => {
        if (!user) return;

        const token = await getToken();

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/User/addUser`, {
            method: "POST",
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" }
            
        });

        const data = await response.json();

        if (data.firstTime) {
            console.log("🎉 Welcome, first-time user!");
            // Show onboarding, welcome popup, etc.
        } else {
            console.log("👋 Welcome back!");
        }
    };
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className='z-10'>
                <Sidebar handleAddCourse={handleAddCourse} setIndex={setIndex} />
            </div>
            
            {
                 tell ? <CourseArea course={course[index]} />:<div className='w-3/4 p-4 bg-opacity-95  flex text-white cursor-default bg-gray-800 absolute right-0 h-[90vh] overflow-y-auto'>
                    <div className='p-4 border-y-2 border-gray-300 text-4xl w-10/12 text-center m-auto bg-white bg-opacity-25 rounded-md  font-extrabold'>No course Selected Yet</div>
                 </div>

            }
           
        </div>
    )
}

export default Home
