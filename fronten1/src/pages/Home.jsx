import React from 'react'
import Navbar from '../componenets/Navbar'
import { useState,useEffect } from 'react'
import Sidebar from '../componenets/Sidebar'
import CourseArea from '../componenets/CourseArea'
import { useAuth ,useUser} from '@clerk/clerk-react'
import AddCourse from '../componenets/AddCourse'
const Home = () => {
    const { getToken } = useAuth();

    const [course, setCourse] = useState([]);
    const [tell, settell]=useState(false);
    const [tell2, settell2]=useState(false);
    const [index, setIndex] = useState(null);
    const [course2, setCourse2] = useState([]);
    const [openaddcourse, setopenaddcourse] = useState(false);
    useEffect(() => {
      handleAddCourse();
    }, [])
    
    const handleAddCourse = async () => {
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
                throw new Error(data.message || "Failed to get course");
            }
            setCourse(data);
            setCourse2(data);
            
    };
    const { user, isSignedIn } = useUser();

    useEffect(() => {
        if (isSignedIn) {
            checkFirstTimeUser(); 
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
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar setCourse={setCourse2}  settell={settell} settell2={settell2}/>
            <div className='-z-10'>
                <Sidebar course2={course} setopenaddcourse={setopenaddcourse} settell={settell} settell2={settell2} setIndex={setIndex} />
            </div>
            
            {
                 tell ? (!tell2 ?<div className='z-10'><CourseArea course={course[index]} /></div>:<div className='z-10'><CourseArea course={course2} /></div>):<div className='w-3/4 p-4 bg-opacity-95  flex text-white cursor-default bg-gray-800 absolute right-0 h-[90vh] overflow-y-auto'>
                    <div className='p-4 border-y-2 border-gray-300 text-4xl w-10/12 text-center m-auto bg-white bg-opacity-25 rounded-md  font-extrabold'>No course Selected Yet</div>
                 </div>
            }   
            { !(tell || tell2)  &&
             (openaddcourse && <AddCourse />)
            } 
        </div>
    )
}

export default Home
