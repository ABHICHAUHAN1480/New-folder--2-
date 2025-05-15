import { set } from 'mongoose';
import React from 'react'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {useAuth,} from '@clerk/clerk-react'
const AddCourse = () => {
    const { getToken } = useAuth();
    const [pointsLen, setpointsLen] = useState(2);
    const [topicLen, settopicLen] = useState(1);
    const [isPublic, setIsPublic] = useState(true);
    const [courseName, setCourseName] = useState('');
    const [courseInstructor, setCourseInstructor] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [keywords, setKeywords] = useState('');
    const [importantPoints, setImportantPoints] = useState(Array(pointsLen).fill(""));
    const [loading, setloading] = useState(false);
    const [topics, setTopics] = useState([
        {
            topicName: "",
            subtopics: [{ subtopicName: "", videoLink: "", articleLink: "" }]
        }
    ]);


    const increasePoints = (val) => {
        setloading(true);
        if (val === 1) {
            if (pointsLen < 10) {
                setImportantPoints([...importantPoints, ""]); 
                setpointsLen(pointsLen + 1);
            } else {
                alert("You can add a maximum of 10 points");
            }
        } else {
            if (pointsLen > 1) {
          
                const confirmDelete = window.confirm(`Are you sure you want to delete point ${pointsLen}?`);
                if (confirmDelete) {
                    setImportantPoints(importantPoints.slice(0, -1)); 
                    setpointsLen(pointsLen - 1);
                }
            } else {
                alert("You must have at least 1 point");
            }
        }
        setloading(false);
    };
    
    const increaseSubtopic = (topicIndex, val) => {
        setloading(true);
        setTopics(prevTopics => {
            return prevTopics.map((topic, index) => {
                if (index === topicIndex) {
                    if (val === 1) {
                        if (topic.subtopics.length < 15) {

                            return {
                                ...topic,
                                subtopics: [
                                    ...topic.subtopics,
                                    { subtopicName: "", videoLink: "", articleLink: "" }
                                ]
                            };
                        } else {
                            alert('You can add a maximum of 15 subtopics');
                        }
                    } else {
                        if (topic.subtopics.length > 1) {
                            if (window.confirm(`Are you sure you want to delete subtopic ${topic.subtopics.length}?`)) {
                                return {
                                    ...topic,
                                    subtopics: topic.subtopics.slice(0, -1)
                                };
                            }
                        } else {
                            alert('You must have at least 1 subtopic');
                        }
                    }
                }
                return topic;
            });
        }); 
        setloading(false);
    };

    const increaseTopic = (val) => {
        if (val === 1) {
            if (topicLen < 20) {
                settopicLen(topicLen + 1);
                setTopics([...topics, {
                    topicName: "",
                    subtopics: [{ subtopicName: "", videoLink: "", articleLink: "" }]
                }])
            } else {
                alert('You can add maximum 10 topics')
            }
        }
        else {
            if (topicLen > 1) {
                window.confirm(`Are you sure you want to delete  topic ${topicLen}?`)
                settopicLen(topicLen - 1);
                setTopics(topics.slice(0, -1))
            } else {
                alert('You have to  add minimum 1 topic')
            }
        }
    }

    const handlePointChange = (index, value) => {
        setImportantPoints((prevPoints) =>
            prevPoints.map((point, i) => (i === index ? value : point))
        );
    };


    const handlesubmit = async () => {
        setloading(true);
        const token = await getToken();
    
        if (courseName === '') {
            toast.error('Course Name is required');
            return;
        } else if (courseInstructor === '') {
            toast.error('Course Instructor Name is required');
            return;
        } else if (courseDescription === '') {
            toast.error('Course Description is required');
            return;
        } else if (courseCode === '') {
            toast.error('Course Code is required');
            return;
        } else if (keywords === '') {
            toast.error('Keywords are required');
            return;
        } else if (importantPoints.includes("")) {
            toast.error('All Important Points are required');
            return;
        } else if (topics.some(topic => topic.topicName === '')) {
            toast.error('All Topic Names are required');
            return;
        } else if (topics.some(topic => topic.subtopics.some(subtopic => subtopic.subtopicName === ''))) {
            toast.error('All Subtopic Names are required');
            return;
        } else if (topics.some(topic => topic.subtopics.some(subtopic => subtopic.videoLink === ''))) {
            toast.error('All Subtopic Video Links are required');
            return;
        }
    
        if (!topics.some(topic =>
            topic.subtopics.some(subtopic =>
                subtopic.videoLink.includes('youtube.com') || subtopic.videoLink.includes('youtu.be')
            )
        )) {
            toast.error('All Subtopic Video Links should be from YouTube');
            return;
        }
    
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/temp/addCourse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    courseName,
                    courseInstructor,
                    courseDescription,
                    courseCode,
                    keywords: keywords.split(',').map(keyword => keyword.trim()),
                    importantPoints,
                    topics,
                    privacy: isPublic ? 'Public' : 'Private'
                })
            });
    
            if (!res.ok) {
                setloading(false);
                toast.error('Failed to add course');
                return;
            }
    
            toast.success('Course Added Successfully');
            setCourseName('');
            setCourseInstructor('');
            setCourseDescription('');
            setCourseCode('');
            setKeywords('');
            setImportantPoints(() => Array(pointsLen).fill(""));
            setTopics([
                {
                    topicName: "",
                    subtopics: [{ subtopicName: "", videoLink: "", articleLink: "" }]
                }
            ]);
            setpointsLen(2);
            settopicLen(1);
            setIsPublic(true);
            
        } catch (error) {
            setloading(false);
            console.error("Error adding course:", error);
            toast.error('Something went wrong');
        }
        setloading(false);
    };
    const handleChangeTopic = (index, value) => {
        setTopics((prevTopics) =>
            prevTopics.map((topic, i) =>
                i === index ? { ...topic, topicName: value } : topic
            )
        );
    };

    const handleChangeSubtopic = (topicIndex, subIndex, name, value) => {
        setloading(true);
        setTopics((prevTopics) =>
            prevTopics.map((topic, i) =>
                i === topicIndex
                    ? {
                        ...topic,
                        subtopics: topic.subtopics.map((subtopic, j) =>
                            j === subIndex ? { ...subtopic, [name]: value } : subtopic
                        )
                    }
                    : topic
            )
        ); setloading(false);
    };
   
    return (
        <>
          {loading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="flex flex-col items-center gap-4">
          <lord-icon
            src="https://cdn.lordicon.com/dupxuoaa.json"
            trigger="loop"
            state="loop-transparency"
            colors="primary:#ffffff"
            style={{ width: 100, height: 100 }}
          ></lord-icon>
          <span className="text-white text-xl font-semibold">Loading, please wait...</span>
        </div>
      </div>
    )}
        <div><Toaster /></div>
            <div className='w-3/4 p-6 text-white pb-10 cursor-default bg-gray-900 absolute right-0 h-[90vh] hide-scrollbar overflow-y-auto  shadow-lg'>
                <h1 className='text-4xl font-extrabold text-gray-100 mb-8'>Make Your Course/RoadMap</h1>
                <div className='p-3 bg-gray-700 mb-4 font-bold rounded-md text-center text-2xl shadow-md'>Course Details</div>
                <div className='flex flex-col gap-8  '>
                    <div className='flex flex-col gap-8 px-2 py-4 rounded-md bg-slate-800 border-y-2 border-gray-300 shadow-md'>
                    <span className='flex items-center gap-10'>
                        <span className='text-lg font-bold bg-gray-800 p-3 rounded-md shadow-md'>Course Name:</span>
                        <input type="text" name='coursename' value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            maxLength="40" placeholder='Max character length is 40' className='p-3 w-1/2 bg-white text-black rounded-md border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </span>
                    <span className='flex items-center gap-10'>
                        <span className='text-lg font-bold bg-gray-800 p-3 rounded-md shadow-md'>Course Instructor Name:</span>
                        <input type="text"
                            name='courseInstructor'
                            value={courseInstructor}
                            onChange={(e) => setCourseInstructor(e.target.value)}
                            maxLength="40" placeholder='Max character length is 40' className='p-3 w-1/2 bg-white text-black rounded-md border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </span>
                    <span className='flex items-center gap-10'>
                        <span className='text-lg font-bold bg-gray-800 p-3 rounded-md shadow-md'>Course Description:</span>
                        <textarea maxLength="800"
                            name='courseDescription'
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)}
                            placeholder='Max character length is 800' className='p-3 w-8/12 bg-white text-black rounded-md border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </span>
                    <span className='flex items-center gap-10'>
                        <span className='text-lg font-bold bg-gray-800 p-3 rounded-md shadow-md'>Course Code:</span>
                        <input type='text'
                            name='courseCode'
                            value={courseCode}
                            onChange={(e) => setCourseCode(e.target.value)}
                            maxLength="10" placeholder='"BXIS378" (Max character length is 10)' className='p-3 w-8/12 bg-white text-black rounded-md border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </span>
                    <span className='flex items-center gap-10'>
                        <span className='text-lg font-bold bg-gray-800 p-3 rounded-md shadow-md'>Important Points:</span>
                        <span className='w-1/2 flex flex-col gap-4'>
                            {
                                [...Array(pointsLen)].map((_, index) => (
                                    <textarea maxLength="200"
                                        key={index}
                                        value={importantPoints[index] || ""} 
                                        onChange={(e) => handlePointChange(index, e.target.value)}
                                        placeholder={`${index + 1}: Max character length is 200`}
                                        className='p-3 w-full bg-white text-black rounded-md border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    />
                                ))
                            }

                            <span className='flex gap-4'>
                                <span
                                    onClick={() => increasePoints(1)}
                                    className='text-white font-bold cursor-pointer text-sm items-center hover:scale-105 transition bg-green-500 flex rounded-md w-[80px] p-2 gap-2 shadow-md'> Add <lord-icon
                                        src="https://cdn.lordicon.com/fijxgivs.json"
                                        trigger="click"
                                        state="hover-square"
                                        colors="primary:#ffffff"
                                        style={{ width: 25, height: 25 }}>
                                    </lord-icon></span>
                                <span
                                    onClick={() => increasePoints(0)}
                                    className='text-white font-bold cursor-pointer text-sm items-center hover:scale-105 transition bg-red-500 flex rounded-md w-[90px] p-2 gap-2 shadow-md'> Delete <lord-icon
                                        src="https://cdn.lordicon.com/dygpxmzx.json"
                                        trigger="hover"
                                        state="hover-square"
                                        colors="primary:#ffffff"
                                        style={{ width: 25, height: 25 }}>
                                    </lord-icon></span>
                            </span>
                        </span>
                    </span>
                    <span className='flex items-center gap-10'>
                        <span className='text-lg font-bold bg-gray-800 p-3 rounded-md shadow-md'>Keyword:</span>
                        <input type="text"
                            name='keywords'
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            maxLength="200" placeholder='Keywords for searching...(separated by comma ",")' className='p-3 w-1/2 bg-white text-black rounded-md border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </span>
                    <span className='flex items-center gap-10'>
                        <span className='text-lg font-bold bg-gray-800 p-3 rounded-md shadow-md'>Privacy:</span>
                        <div className={`w-[200px] h-10 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 relative ${isPublic ? "bg-green-500" : "bg-gray-500"}`}
                            onClick={() => setIsPublic(!isPublic)}>

                            <span className={`absolute w-full text-xl left-4 text-white font-bold transition-opacity duration-300`} >
                                Public
                            </span>
                            <span className={`absolute w-full text-xl left-28 text-white font-bold transition-opacity duration-300`}>
                                Private
                            </span>
                            <div
                                className={`w-1/2 h-8 bg-white rounded-full shadow-md transform transition-all duration-300 ${isPublic ? "translate-x-24" : "translate-x-0"}`} ></div>
                        </div>

                    </span></div>
                    <div className='p-3 bg-gray-700 mb-4 font-bold rounded-md text-center text-2xl shadow-md'>Topics Details</div>
                    {topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className='flex w-[95%] mx-auto p-4 flex-col gap-4 bg-slate-800 rounded-lg shadow-md'>
                            <span className='text-lg border-b-2 font-bold bg-gray-800 p-3 rounded-md shadow-md'>
                                Topic {topicIndex + 1}:
                            </span>
                            <span className='flex gap-10'>
                                <span className='text-lg font-bold bg-gray-800 p-3 rounded-md shadow-md'>
                                    Topic name:
                                </span>
                                <input
                                    type="text"
                                    minLength="1"
                                    maxLength="40"
                                    value={topic.topicName}
                                    onChange={(e) => handleChangeTopic(topicIndex, e.target.value)}
                                    placeholder='Max character length is 40'
                                    className='p-3 w-1/2 bg-white text-black rounded-md border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </span>

                            <span className='text-lg font-bold bg-gray-800 p-3 text-center rounded-md shadow-md'>
                                Subtopics
                            </span>

                            {topic.subtopics.map((_, subIndex) => (
                                <span key={subIndex} className='flex gap-6 ml-10 flex-col border-y-2 py-3 rounded-md'>
                                    <span className='flex gap-10'>
                                        <span className='text-lg font-bold bg-gray-800 p-3 rounded-md shadow-md'>
                                            Subtopic name {subIndex + 1}:
                                        </span>
                                        <input
                                            type="text"
                                            maxLength="40"
                                            value={topic.subtopics[subIndex].subtopicName}
                                            onChange={(e) => handleChangeSubtopic(topicIndex, subIndex, 'subtopicName', e.target.value)}
                                            placeholder='Max character length is 40'
                                            className='p-3 w-1/2 bg-white text-black rounded-md border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        />
                                    </span>

                                    <span className='flex gap-10'>
                                        <span className='text-lg font-bold bg-gray-800 p-3 rounded-md shadow-md'>
                                            Video Link:
                                        </span>
                                        <input
                                            type="text"
                                            value={topic.subtopics[subIndex].videoLink}
                                            onChange={(e) => handleChangeSubtopic(topicIndex, subIndex, 'videoLink', e.target.value)}
                                            maxLength="40"
                                            placeholder='Max character length is 40'
                                            className='p-3 w-1/2 bg-white text-black rounded-md border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        />
                                    </span>

                                    <span className='flex gap-10'>
                                        <span className='text-lg font-bold bg-gray-800 p-3 rounded-md shadow-md'>
                                            Article Link:
                                        </span>
                                        <input
                                            type="text"
                                            value={topic.subtopics[subIndex].articleLink}
                                            onChange={(e) => handleChangeSubtopic(topicIndex, subIndex, 'articleLink', e.target.value)}
                                            maxLength="40"
                                            placeholder='Max character length is 40'
                                            className='p-3 w-1/2 bg-white text-black rounded-md border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        />
                                    </span>
                                </span>
                            ))}              
                            <span className='flex gap-4 justify-center'>
                                <span
                                    onClick={() => increaseSubtopic(topicIndex, 1)}
                                    className='text-white font-bold cursor-pointer text-sm items-center hover:scale-105 transition bg-green-500 flex rounded-md w-[80px] p-2 gap-2 shadow-md'>
                                    Add
                                    <lord-icon
                                        src="https://cdn.lordicon.com/fijxgivs.json"
                                        trigger="click"
                                        state="hover-square"
                                        colors="primary:#ffffff"
                                        style={{ width: 25, height: 25 }}>
                                    </lord-icon>
                                </span>

                                <span
                                    onClick={() => increaseSubtopic(topicIndex, 0)}
                                    className='text-white font-bold cursor-pointer text-sm items-center hover:scale-105 transition bg-red-500 flex rounded-md w-[90px] p-2 gap-2 shadow-md'>
                                    Delete
                                    <lord-icon
                                        src="https://cdn.lordicon.com/dygpxmzx.json"
                                        trigger="hover"
                                        state="hover-square"
                                        colors="primary:#ffffff"
                                        style={{ width: 25, height: 25 }}>
                                    </lord-icon>
                                </span>
                            </span>
                        </div>
                    ))}

                    <span className='flex gap-4 ml-7'>
                        <span
                            onClick={() => increaseTopic(1)}
                            className='px-6 py-3 flex items-center gap-2 text-white font-bold bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300'>
                            <lord-icon
                                src="https://cdn.lordicon.com/fijxgivs.json"
                                trigger="click"
                                state="hover-square"
                                colors="primary:#ffffff"
                                style={{ width: 25, height: 25 }}>
                            </lord-icon>
                            Add Topic

                        </span>
                        <span
                            onClick={() => increaseTopic(0)}
                            className='px-6 py-3 flex items-center gap-3 text-white font-bold bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 '>    <lord-icon
                                src="https://cdn.lordicon.com/dygpxmzx.json"
                                trigger="hover"
                                state="hover-square"
                                colors="primary:#ffffff"
                                style={{ width: 25, height: 25 }}>
                            </lord-icon>
                            Delete topic

                        </span>
                    </span>


                </div>

                <button
                    onClick={handlesubmit}
                    className="mt-8 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
                    🚀 Launch Course
                </button>
            </div>
            
            </>
    )
}

export default AddCourse
