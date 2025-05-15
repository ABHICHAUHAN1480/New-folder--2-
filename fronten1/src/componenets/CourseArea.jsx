import { SignedIn } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react';
import { toast, Toaster } from 'react-hot-toast';


const CourseArea = ({ course, setCourse3 }) => {
    const [Subscribed, setSubscribed] = useState(false);
    const [owned, setOwned] = useState(false);
    const { getToken } = useAuth();
    const [point, setpoint] = useState(false);
    const [Count, setCount] = useState(0);
    const [openTopicId, setOpenTopicId] = useState(0);
    const [comSubtopic, setComSubtopic] = useState(0);
    const [onvideo, setOnvideo] = useState(false);
    const [video, setVideo] = useState("");
    const [loading, setloading] = useState(false);
    const [subtopic, setSubtopic] = useState("");

    useEffect(() => {
        counttopics(topics);
        handleSubscription();
    }, [course])
    const handleSubscription = async () => {
        setloading(true);
        const token = await getToken();
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/User/enroll?courseCode=${course.courseCode}`, {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },

            });
            if (!res.ok) {
                setloading(false);
                toast.error('Failed to enroll in course');
                return;
            }
            const data = await res.json();

            if (data.status === "owned") {
                setOwned(true);
                setSubscribed(false);
            } else if (data.status === "enrolled") {
                setSubscribed(true);
                setOwned(false);
            } else {
                setSubscribed(false);
                setOwned(false);
            }
            setloading(false);
        } catch (error) {
            setloading(false);
            console.error("Error enrolling in course:", error);
            toast.error('Something went wrong');
        }
    }

    const topics = course.topics;
    const counttopics = (topics) => {
        setloading(true);
        const totalSubtopics = course.courseCompletion.reduce((acc, topic) => acc + topic.length, 0);
        const completedSubtopics = course.courseCompletion.reduce((acc, topic) => acc + topic.filter(c => c === 1).length, 0);
        setComSubtopic(completedSubtopics);
        setCount(totalSubtopics);
        setloading(false);
    }
    const toggleTopic = (id) => {
        setOpenTopicId((prevId) => (prevId === id ? null : id));
    };
    const extractYouTubeVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:.*v=|embed\/|v\/)|youtu\.be\/)([^?&/]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const convertYouTubeLink = (url) => {
        const videoId = extractYouTubeVideoId(url);
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    const handlecompletion = async (topicIndex, subtopicIndex) => {
        setloading(true);
        const token = await getToken();
        let val = 2;
        if (Subscribed) {
            val = 1;
        } else if (owned) {
            val = 0;
        }

        if (val !== 2) {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/course/updatecompletion`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        courseCode: course.courseCode,
                        topicIndex,
                        subtopicIndex,
                        value: val
                    })
                });
                if (!res.ok) {
                    setloading(false);
                    toast.error('Failed to update completion');
                    return;
                }
                if (course.courseCompletion[topicIndex][subtopicIndex] === 0) {
                    course.courseCompletion[topicIndex][subtopicIndex] = 1;

                    setComSubtopic((prev) => prev + 1);
                } else {
                    if (course.courseCompletion[topicIndex][subtopicIndex] === 1) {
                        course.courseCompletion[topicIndex][subtopicIndex] = 0;

                        setComSubtopic((prev) => prev - 1);
                    }
                }
                setloading(false);
            } catch (error) {
                setloading(false);
                console.error("Error updating completion:", error);
                toast.error('Something went wrong');
            }
        } else {
            setloading(false);
            toast.error('Please enroll in the course to update completion');
        }
    }

    const handleRevision = async (topicIndex, subtopicIndex) => {
        setloading(true);
        const token = await getToken();
        let val = 2;
        if (Subscribed) {
            val = 1;
        } else if (owned) {
            val = 0;
        }

        if (val !== 2) {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/course/updaterevision`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        courseCode: course.courseCode,
                        topicIndex,
                        subtopicIndex,
                        value: val
                    })
                });
                if (!res.ok) {
                    setloading(false);
                    toast.error('Failed to update completion');
                    return;
                }

                if (course.courseRevision[topicIndex][subtopicIndex] === 0) {
                    course.courseRevision[topicIndex][subtopicIndex] = 1;

                    // setComSubtopic((prev) => prev + 1);
                } else {
                    if (course.courseRevision[topicIndex][subtopicIndex] === 1) {
                        course.courseRevision[topicIndex][subtopicIndex] = 0;
                        // setComSubtopic((prev) => prev - 1);
                    }
                }


                setloading(false);
            } catch (error) {
                setloading(false);
                console.error("Error updating completion:", error);
                toast.error('Something went wrong');
            }
        } else {
            setloading(false);
            toast.error('Please enroll in the course to update Revision Star');
        }
    }

    const enrollthecourse = async (val) => {
        setloading(true);
        const token = await getToken();
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/User/enrolling`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    courseCode: course.courseCode,
                    value: val
                })
            });
            if (!res.ok) {
                setloading(false);
                toast.error('Failed to enroll in course');
                return;
            }
            const data = await res.json();
            if (val === 1) {
                setCourse3((prev) => [...prev, course]);
                setSubscribed(true);
            } else {
                setCourse3((prev) => prev.filter((c) => c.courseCode !== course.courseCode));
                setSubscribed(false);
            }
            setloading(false);
        } catch (error) {
            setloading(false);
            console.error("Error enrolling in course:", error);
            toast.error('Something went wrong');
        }
    }

    const handledelete = async () => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            const userInput = window.prompt(`type ${course.courseName} to confirm deletion`);
            if (userInput !== course.courseName) {
                toast.error("Course code does not match. Deletion cancelled.");
                return;
            }

            try {
                setloading(true);
                const token = await getToken();

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/User/deletecourse`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        courseCode: course.courseCode
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to delete course');
                }

                const data = await response.json();

                if (data.message === "Course deleted successfully") {
                    setCourse3((prev) => prev.filter((c) => c.courseCode !== course.courseCode));
                    toast.success('Course deleted successfully');
                } else {
                    toast.error('Failed to delete course');
                }
            } catch (error) {
                console.error("Error deleting course:", error);
                toast.error(error.message || 'Something went wrong');
            } finally {
                setloading(false);
            }
        }
    }

    

    return (
        <>  {loading && (
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
            <div><Toaster /></div>
            <div>
                {onvideo && (
                    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-20 z-50">

                        <div className='w-8/12 relative h-[70%] rounded-md bg-gray-900'>
                            <div className='flex justify-between border-b-2 pb-2 mx-4 rounded-b-md border-gray-400'>
                                <span className=' font-bold text-2xl text-gray-200 my-auto  '>{subtopic}</span>

                                <button onClick={() => { setOnvideo(false); setVideo("") }}
                                    className='bg-red-500 text-white rounded-md py-2 px-4 text-lg mt-2'>
                                    Close
                                </button>

                            </div>
                            <iframe

                                className="m-auto py-6 px-3   h-[90%] w-[90%]"
                                src={convertYouTubeLink(video)}
                                title="YouTube video player"

                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe></div>
                    </div>

                )}
                <div className="w-3/4 p-6 text-white pb-10 cursor-default bg-gray-950 absolute right-0 h-[90vh] hide-scrollbar overflow-y-auto shadow-xl ">
                    <div className="text-3xl font-extrabold flex items-center justify-between border-b pb-4 border-gray-700">
                        <span>{course.courseName}</span>
                        <span
                            className='cursor-pointer flex gap-4'>
                            {owned && <span
                                onClick={() => handledelete()}
                                className='mr-9'><lord-icon
                                    src="https://cdn.lordicon.com/qnhhgmwn.json"
                                    trigger="hover"
                                    colors="primary:#d4d1fa,secondary:#e4e4e4,tertiary:#000,quaternary:#ee8f66"
                                    style={{ width: 45, height: 45 }}>
                                </lord-icon></span>
                            }

                            {
                                Subscribed && <span
                                    onClick={() => enrollthecourse(0)}
                                    className='mr-9'><lord-icon
                                        src="https://cdn.lordicon.com/sggckopq.json"
                                        trigger="hover"
                                        colors="primary:#b4b4b4,secondary:#242424,tertiary:#545454"
                                        style={{ width: 55, height: 55 }}>
                                    </lord-icon></span>
                            }
                            {!Subscribed && !owned && <span
                                onClick={() => enrollthecourse(1)}
                                className=' mr-9 mt-3'><lord-icon
                                    src="https://cdn.lordicon.com/mexzolaf.json"
                                    trigger="loop"
                                    delay="3000"
                                    colors="primary:#b4b4b4,secondary:#545454,tertiary:#ffffff"
                                    style={{ width: 55, height: 55 }}>
                                </lord-icon></span>}
                        </span>
                    </div>

                    <div className='mt-6 text-gray-300 leading-relaxed'>{course.courseDescription}</div>

                    <div className='border-y-2 border-gray-600 mt-6 py-4 bg-opacity-30 bg-gray-800 rounded-lg shadow-md px-4'>
                        <div onClick={() => setpoint((prev) => !prev)} className='cursor-pointer flex justify-between items-center'>
                            <span className='font-semibold'>Points to be known for course</span>
                            <lord-icon
                                src="https://cdn.lordicon.com/wjlyhulz.json"
                                trigger="click"
                                colors="primary:#fff"
                                style={{ width: 30, height: 30 }}>
                            </lord-icon>
                        </div>
                        {point && (
                            <ul className='list-disc px-6 mt-3 text-gray-400 space-y-1'>
                                {course.impPoints.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className=' flex gap-4 items-center mt-6'>
                        <div className='w-1/3  flex justify-between bg-gray-800 p-4 text-lg font-bold rounded-lg text-gray-300 shadow-md'>
                            <span>Progress: {comSubtopic}/{Count}</span>
                            <span className='text-red-400'>{((comSubtopic / Count) * 100).toFixed(0)}% complete</span>
                        </div>
                        <span
                           
                        className='cursor-pointer'>
                        <lord-icon
                            src="https://cdn.lordicon.com/pjxlvvnb.json"
                            trigger="click"
                            colors="primary:#121331,secondary:#e83a30,tertiary:#9cf4a7"
                            style={{width:65,height:65}}>
                        </lord-icon></span>
                    </div>

                    <div className='mt-6'>
                        {topics.map((topic, index) => (
                            <div key={index} className='mb-4'>
                                <div onClick={() => toggleTopic(topic._id)}
                                    className='cursor-pointer border-t-2 bg-opacity-25 bg-gray-800 rounded-lg p-4 flex justify-between items-center shadow-md hover:bg-gray-700 transition'>
                                    <span className='font-semibold'>Step {index + 1}: {topic.topicName}</span>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/wjlyhulz.json"
                                        trigger="click"
                                        colors="primary:#fff"
                                        style={{ width: 30, height: 30 }}>
                                    </lord-icon>
                                </div>
                                {openTopicId === topic._id && (
                                    <ul className='ml-4 mt-2 bg-gray-700 p-3 rounded-lg shadow-lg'>
                                        <li className='text-gray-400  flex justify-between items-center p-2 text-lg font-semibold border-b border-gray-600'>
                                            <span className='w-1/6 ml-4'>Topic</span>
                                            <span>Article</span>
                                            <span>Videos</span>
                                            <span>revision</span>
                                            <span>Status</span>
                                        </li>
                                        {topic.subtopics.map((subtopic, index2) => (
                                            <li key={index2} className='text-gray-300 flex justify-between items-center p-2 border-b border-gray-600'>
                                                <span className='w-1/6'>{subtopic.subtopicName}</span>
                                                <a href={subtopic.articleLink} target="_blank" rel="noopener noreferrer">
                                                    <lord-icon src="https://cdn.lordicon.com/glbvkwft.json" trigger="hover" style={{ width: 40, height: 40 }}></lord-icon>
                                                </a>
                                                <span onClick={() => { setOnvideo(true); setVideo(subtopic.videoLink); setSubtopic(subtopic.subtopicName) }} className='cursor-pointer'>
                                                    <lord-icon src="https://cdn.lordicon.com/dbcganmh.json" trigger="morph" style={{ width: 40, height: 40 }}></lord-icon>
                                                </span>

                                                <span
                                                    onClick={() => handleRevision(index, index2)}
                                                    className="cursor-pointer"
                                                >
                                                    {course.courseRevision?.[index]?.[index2] === 1 ? (
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/uihwbzln.json"
                                                            trigger=""
                                                            state="morph-select"
                                                            colors="primary:#b4b4b4,secondary:#b4b4b4,tertiary:#e83a30"
                                                            style={{ width: 40, height: 40 }}
                                                        />
                                                    ) : (
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/uihwbzln.json"
                                                            trigger=""
                                                            state="morph-select"
                                                            colors="primary:#b4b4b4,secondary:#e83a30,tertiary:#b4b4b4"
                                                            style={{ width: 40, height: 40 }}
                                                        />
                                                    )}
                                                </span>


                                                <span onClick={() => handlecompletion(index, index2)}
                                                    className='cursor-pointer h-8 w-8 rounded-md px-1 flex justify-center  items-center bg-white '>
                                                    {
                                                        course.courseCompletion[index][index2] === 1 ?
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
