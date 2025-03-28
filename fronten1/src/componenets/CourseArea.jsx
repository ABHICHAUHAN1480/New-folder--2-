import { SignedIn } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'

const CourseArea = (course) => {
    const [point, setpoint] = useState(false);
    const [Count, setCount] = useState(0);
    const [openTopicId, setOpenTopicId] = useState(0);
    const [comSubtopic, setComSubtopic] = useState(0);
    const [onvideo, setOnvideo] = useState(false);
    const [video, setVideo] = useState("");
    const [subtopic, setSubtopic] = useState("");

    useEffect(() => {
        counttopics(topics);
    },) 

    const topics = course.course.topics;
    const counttopics = (topics) => {
        const totalSubtopics = course.course.courseCompletion.reduce((acc, topic) => acc + topic.length, 0);
        const completedSubtopics = course.course.courseCompletion.reduce((acc, topic) => acc + topic.filter(c => c === 1).length, 0);
        setComSubtopic(completedSubtopics);
        setCount(totalSubtopics);
    }
    const toggleTopic = (id) => {
        setOpenTopicId((prevId) => (prevId === id ? null : id));
    };
    const convertYouTubeLink = (url) => {
        if (url.includes("youtu.be")) {
            const videoId = url.split("/").pop(); 
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    };
    return (
        <>
        <div>
            {onvideo &&
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-20 z-50">

                    <div className='w-8/12 relative h-[70%] rounded-md bg-gray-300'>
                        <span className=' cursor-pointer absolute top-0 right-0   z-10 ' onClick={() => setOnvideo(false)}>
                            <lord-icon
                                src="https://cdn.lordicon.com/nqtddedc.json"
                                trigger="hover"
                                state="hover-cross-3"
                                colors="primary:#121331,secondary:#121331"
                                style={{ width: 25, height: 25 }}>
                            </lord-icon>
                            </span>
                            {/* <span className=' font-bold text-3xl mx-4 rounded-lg bg-slate-700 absolute'>{subtopic}</span> */}
                            <iframe

                                className="m-auto py-6 px-3   h-full w-full"
                                src={convertYouTubeLink(video)}
                                title="YouTube video player"

                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe></div>
                </div>}
            <div className='w-3/4 p-4 text-white pb-10 cursor-default bg-gray-950 absolute right-0 h-[90vh] hide-scrollbar overflow-y-auto'>
                <div className='text-3xl font-extrabold flex items-center justify-between '><span>{course.course.courseName} </span>

                    <span className='cursor-pointer'><lord-icon
                        src="https://cdn.lordicon.com/qnhhgmwn.json"
                        trigger="hover"
                        colors="primary:#d4d1fa,secondary:#e4e4e4,tertiary:#000,quaternary:#ee8f66"
                        style={{ width: 45, height: 45 }}>
                    </lord-icon>
                    </span> 
                    </div>

                <div className='mt-4'>
                    {course.course.courseDescription}
                </div>
                <div className='border-y-2 border-gray-300 mt-4 py-4 bg-opacity-25 bg-white rounded-lg'>
                    <div onClick={() => setpoint((prev) => !prev)} className='cursor-pointer flex justify-between px-4'>
                        <span className=''>Points to be known for course</span>
                        <lord-icon
                            src="https://cdn.lordicon.com/wjlyhulz.json"
                            trigger="click"
                            colors="primary:#fff"
                            style={{ width: "30px", height: "30px" }}
                        ></lord-icon>
                    </div>

                    {point && (
                        <ul className='list-disc px-8 mt-2'>
                            {course.course.impPoints.map((point, index) => (
                                <li className=' text-gray-400' key={index}>{point}</li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className='w-1/3 mt-4 flex flex-row items-center justify-between bg-white p-4 text-lg font-bold rounded-lg text-gray-600'>
                    <span>Progress:{comSubtopic}/{Count}
                    </span>
                    <span className='text-red-400' >{((comSubtopic / Count) * 100).toFixed(2)}% complete </span>

                </div>
                <div className=' border-gray-300 mt-4 pt-4'>
                    {topics.map((topic, index) => (
                        <div key={index}>
                            <div onClick={() => toggleTopic(topic._id)} className='cursor-pointer border-t-2 bg-opacity-25 bg-white rounded-lg mt-2 flex justify-between p-4'>
                                <span className=''>Step {index + 1} : {topic.topic}</span>
                               <span className='flex items-center gap-2'>  
                                <span className='py-1 px-2 bg-gray-600 rounded-lg'> {course.course.courseCompletion[index].filter((c) => c === 1).length}/{topic.subtopics.length}</span>
                                <lord-icon
                                    src="https://cdn.lordicon.com/wjlyhulz.json"
                                    trigger="click"
                                    colors="primary:#fff"
                                    style={{ width: "30px", height: "30px" }}
                                ></lord-icon></span> 

                            </div>
                            {openTopicId === topic._id && (
                                <ul className="ml-4 mt-2 bg-opacity-25  bg-gray-100 p-2 rounded">
                                    <li  className="text-gray-400 flex justify-between items-center  p-2 border-t-2 mb-1 text-xl font-bold  rounded-md border-gray-300">
                                        <span className='w-1/6 overflow-hidden' >Topic</span>
                                        <span>Article</span>
                                        <span>Videos</span>
                                        <span>Status</span>
                                    </li>
                                    {topic.subtopics.map((subtopic, index) => (
                                        <li key={index} className="text-gray-200 flex justify-between items-center  p-2 border-t-2 mb-1 border-b-2 rounded-md border-gray-300">
                                            <span className='w-1/6 overflow-hidden' >{subtopic.subname}</span>

                                            <span className='cursor-pointer'><lord-icon
                                                src="https://cdn.lordicon.com/glbvkwft.json"
                                                trigger="hover"
                                                colors="primary:#d4d1fa,secondary:#e3c0ac,tertiary:#f24c00"
                                                style={{ width: 45, height: 45 }}>
                                            </lord-icon></span>
                         
                                            <span
                                                onClick={() => {
                                                    setOnvideo(true);
                                                    setVideo(subtopic.sublink);
                                                    setSubtopic(subtopic.subname);
                                                }}
                                                className='cursor-pointer'><lord-icon
                                                    src="https://cdn.lordicon.com/dbcganmh.json"
                                                    trigger="morph"
                                                    state="morph-logotype"
                                                    colors="primary:#e3c0ac,secondary:#f24c00,tertiary:#ee8f66"
                                                    style={{ width: 45, height: 45 }}>
                                                </lord-icon></span>
                                            <span
                                                onClick={() => {
                                                    if (topic.completions[index] === 0) {
                                                        topic.completions[index] = 1;
                                                        setComSubtopic((prev) => prev + 1);
                                                    } else {
                                                        if (topic.completions[index] === 1) {
                                                            topic.completions[index] = 0;
                                                            setComSubtopic((prev) => prev - 1);
                                                        }
                                                    }
                                                }}
                                                className='h-8 w-8 rounded-md px-1 flex justify-center cursor-pointer items-center bg-white '>

                                                {topic.completions[index] === 1 ?
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/rnbuzxxk.json"
                                                        trigger="in"
                                                        state="hover-pinch"
                                                        colors="primary:#121331,secondary:#545454"
                                                        style={{ width: 25, height: 25 }}>
                                                    </lord-icon> : ""}
                                                    
                                            </span>

                                        </li>

                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
        {/* <button className='z-50 mt-96 ml-96 pl-52 pt-52 bg-blue-950' onClick={()=>console.log(course)}>click me</button> */}
    </>
    )
}

export default CourseArea
