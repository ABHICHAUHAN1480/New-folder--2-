import { SignedIn } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'

const CourseArea = (course) => {
    const [point, setpoint] = useState(false);
    const [Count, setCount] = useState(0);
    const [openTopicId, setOpenTopicId] = useState(0);
    const [comSubtopic, setComSubtopic] = useState(0);

    useEffect(() => {
        counttopics(topics);
    },)

    const topics =course.course.topics;
    const counttopics = (topics) => {
        const totalSubtopics = topics.reduce((acc, topic) => acc + topic.subtopics.length, 0);
        const completedSubtopics = topics.reduce((acc, topic) => acc + topic.completions.filter(c => c === 1).length, 0);
        setComSubtopic(completedSubtopics);
        setCount(totalSubtopics);
    }
    const toggleTopic = (id) => {
        setOpenTopicId((prevId) => (prevId === id ? null : id));
    };  
    return (
        <>
        <div>
            <div className='w-3/4 p-4 text-white cursor-default bg-gray-950 absolute right-0 h-[90vh] overflow-y-auto'>
                <span className='text-3xl font-extrabold'>{course.course.courseName}</span>
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
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    )}
                </div>
      {/* <button onClick={()=>console.log(course.course)}>click me</button> */}
                <div className='w-1/3 mt-4 flex flex-row items-center justify-between bg-white p-4 text-lg font-bold rounded-lg text-gray-600'>
                    <span>Progress:{comSubtopic}/{Count}

                    </span>
                    <span className='text-red-400' >{((comSubtopic / Count) * 100).toFixed(2)}% complete </span>

                </div>
                <div className=' border-gray-300 mt-4 pt-4'>
                    {topics.map((topic, index) => (
                        <div key={index}>
                            <div onClick={() => toggleTopic(topic.id)} className='cursor-pointer border-t-2 bg-opacity-25 bg-white rounded-lg mt-2 flex justify-between p-4'>
                                <span className=''>Step {index + 1} : {topic.topic}</span>
                                <lord-icon
                                    src="https://cdn.lordicon.com/wjlyhulz.json"
                                    trigger="click"
                                    colors="primary:#fff"
                                    style={{ width: "30px", height: "30px" }}
                                ></lord-icon>

                            </div>
                            {openTopicId === topic.id && (
                                <ul className="ml-4 mt-2 bg-opacity-25  bg-gray-100 p-2 rounded">
                                    {topic.subtopics.map((subtopic, index) => (
                                        <li key={index} className="text-gray-200 flex justify-between  py-5 border-t-2 mb-1 border-b-2 rounded-md border-gray-300">{subtopic}

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
        </div></>
    )
}

export default CourseArea
