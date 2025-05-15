import React, { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
const Homecards = ({ setCourse, settell, setHome, settell2 }) => {
    const { getToken } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        fetchCourses();
    }, [])
    const fetchCourses = async () => {
        setloading(true)
        const token = await getToken();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/home/homecourse`, {
            method: "Get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        const data = await res.json();
        if (!res.ok) {
            setloading(false)
            throw new Error(data.message || "Failed to get course");
        }
        setCourses(data);
        setloading(false)

    }
    const handleclick = async (index) => {
        setloading(true)
        const courseCompletion = courses.courses[index].topics.map(topic => new Array(topic.subtopics.length).fill(0));
        const courseRevision = courses.courses[index].topics.map(topic => new Array(topic.subtopics.length).fill(0));

        const course = {
            ...courses.courses[index],
            courseCompletion,
            courseRevision,
        };
        courses.courses.filter((_, i) => i !== index);
        setCourse(course);
        settell(true);
        settell2(true);
        setHome(false);
        setloading(false)
    }

    return (

        <div className='flex flex-wrap gap-x-8'>
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
            {courses.courses?.length > 0 ? (
                courses.courses.map((course, index) => (
                    <div key={index} className="w-80 h-64 bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="bg-gray-800 text-white p-4 flex flex-col justify-center items-center">
                            <h2 className="text-lg font-bold mb-1">{course.courseName}</h2>
                            <p className="text-sm opacity-75">Instructor: {course.courseInstructor}</p>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-600 text-sm line-clamp-2 min-h-10">{course.courseDescription}</p>
                            <div className="flex justify-between items-center  mt-3 text-gray-700 text-sm">
                                <span className="px-2 py-1 bg-gray-200 rounded-lg">Code: {course.courseCode}</span>
                                <span
                                    className={`px-2 py-1 rounded-lg text-white ${course.privacy === "Public" ? "bg-green-500" : "bg-red-500" }`} >
                                    {course.privacy}
                                </span>
                            </div>
                            <button onClick={() => handleclick(index)}
                                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
                                Open Course
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex justify-center absolute items-center w-11/12 min-h-[70vh]">
                    <div className="p-4 border-y-2 border-gray-300 text-4xl text-center bg-white bg-opacity-25 rounded-md font-extrabold">
                        No Course Selected Yet
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Homecards
