import React from 'react'
import { useState } from 'react'

const AddCourse = () => {
    const [pointsLen, setpointsLen] = useState(2);
    const [subtopicLen, setsubtopicLen] = useState(2);
    const [topicLen, settopicLen] = useState(1);
    const increasePoints = (val) => {
        if (val === 1) {
            if (pointsLen < 10) {
                setpointsLen(pointsLen + 1)
            } else {
                alert('You can add maximum 10 points')
            }
        } else {
            if (pointsLen > 1) {
                window.confirm(`Are you sure you want to delete  point ${pointsLen}?`)
                setpointsLen(pointsLen - 1)
            } else {
                alert('You have to  add minimum 1 points')
            }
        }
    }
    const increaseSubtopic = (val) => {
        if (val === 1) {
            if (subtopicLen < 20) {
                setsubtopicLen(subtopicLen + 1)
            } else {
                alert('You can add maximum 10 subtopics')
            }
        } else {
            if (subtopicLen > 1) {
                window.confirm(`Are you sure you want to delete subtopic ${subtopicLen} ?`)
                setsubtopicLen(subtopicLen - 1)
            } else {
                alert('You have to  add minimum 1 subtopic')
            }
        }
    }
    const increaseTopic = (val) => {
        if (val === 1) {
            if (topicLen < 20) {
                settopicLen(topicLen + 1)
            } else {
                alert('You can add maximum 10 topics')
            }
        }
        else {
            if (topicLen > 1) {
                window.confirm(`Are you sure you want to delete  topic ${topicLen}?`)
                settopicLen(topicLen - 1);
            } else {
                alert('You have to  add minimum 1 topic')
            }
        }
    }
    return (

        <div className='w-3/4 p-4 text-white pb-10 cursor-default bg-gray-950 absolute right-0 h-[90vh] hide-scrollbar overflow-y-auto'>
            <h1 className='text-3xl font-extrabold text-gray-200 mb-6'>Make Your Course/RoadMap</h1>
            <div className='p-2 bg-gray-600 mb-2 font-bold rounded-md text-center text-2xl'>Course Details</div>
            <div className='flex flex-col gap-6'>
                <span className='flex items-center  gap-10'>
                    <span className='text-lg font-bold bg-gray-800 p-2 rounded-md' >Course Name : </span>
                    <input type="text" maxLength="40" placeholder='max character length  is 40' className='p-2 w-1/2 bg-white text-black rounded-md border-2 border-gray-300' />
                </span>
                <span className='flex items-center  gap-10'>
                    <span className='text-lg font-bold bg-gray-800 p-2 rounded-md' >Course Instructore Name : </span>
                    <input type="text" maxLength="40" placeholder='max character length  is 40' className='p-2 w-1/2 bg-white text-black rounded-md border-2 border-gray-300' />
                </span>
                <span className='flex items-center  gap-10'>
                    <span className='text-lg font-bold bg-gray-800 p-2 rounded-md' >Course Description : </span>
                    <textarea maxLength="800" placeholder='max character length  is 800' className='p-2 w-8/12  bg-white text-black rounded-md border-2 border-gray-300' />
                </span>
                <span className='flex items-center  gap-10'>
                    <span className='text-lg font-bold bg-gray-800 p-2 rounded-md' > Important Points : </span>
                    <span className='w-1/2 flex flex-col gap-3'>
                        {
                            [...Array(pointsLen)].map((_, index) => (
                                <textarea maxLength="200" placeholder={`${index + 1} : max character length  is 200`} className='p-2 w-full bg-white text-black rounded-md border-2 border-gray-300' />))
                        }
                        <span className='flex gap-2'>
                            <span
                                onClick={() => increasePoints(1)}
                                className='text-white font-bold cursor-pointer text-sm items-center hover:scale-105 transition bg-gray-400 flex rounded-md w-[70px] p-1  gap-2 '> Add <lord-icon
                                    src="https://cdn.lordicon.com/fijxgivs.json"
                                    trigger="click"
                                    state="hover-square"
                                    colors="primary:#ffffff"
                                    style={{ width: 25, height: 25 }}>
                                </lord-icon></span>
                            <span
                                onClick={() => increasePoints(0)}
                                className='text-white font-bold cursor-pointer text-sm items-center hover:scale-105 transition bg-gray-400 flex rounded-md w-[85px] p-1  gap-2 '> Delete <lord-icon
                                    src="https://cdn.lordicon.com/dygpxmzx.json"
                                    trigger="hover"
                                    state="hover-square"
                                    colors="primary:#ffffff"
                                    style={{ width: 25, height: 25 }}>
                                </lord-icon></span>
                        </span>
                    </span>
                </span>
                <span className='flex items-center  gap-10'>
                    <span className='text-lg font-bold bg-gray-800 p-2 rounded-md' >Keyword : </span>
                    <input type="text" maxLength="200" placeholder='keywords for searching...(seperated by comma ",")' className='p-2 w-1/2 bg-white text-black rounded-md border-2 border-gray-300' />
                </span>
                <div className='p-2 bg-gray-600 mb-2 font-bold rounded-md text-center text-2xl'>Topics Details</div>
                {
                    [...Array(topicLen)].map((_, index) => (
                        <div className='flex w-[95%] mx-auto  p-3 flex-col   gap-3 bg-slate-900'>
                            <span className='text-lg  border-b-2 font-bold bg-gray-800 p-2 rounded-md' > Topic {index + 1}:  </span>
                            <span className='flex gap-10 ' >
                                <span className='text-lg font-bold bg-gray-800 p-2 rounded-md'>
                                    Topic name :
                                </span>
                                <input type="text" maxLength="40" placeholder='max character length  is 40' className='p-2 w-1/2 bg-white text-black rounded-md border-2 border-gray-300' />
                            </span>
                            <span className='text-lg font-bold bg-gray-800 p-2 text-center rounded-md'>
                                Subtopic's
                            </span>
                            {
                                [...Array(subtopicLen)].map((_, index) => (
                                    <span className='flex gap-6  ml-10 flex-col border-y-2 py-2 rounded-md' >
                                        <span className='flex gap-10 ' >
                                            <span className='text-lg font-bold bg-gray-800 p-2 rounded-md'>
                                                Subtopic name {index + 1} :
                                            </span>
                                            <input type="text" maxLength="40" placeholder='max character length  is 40' className='p-2 w-1/2 bg-white text-black rounded-md border-2 border-gray-300' />
                                        </span>
                                        <span className='flex gap-10 ' >
                                            <span className='text-lg font-bold bg-gray-800 p-2 rounded-md'>
                                                Video  Link :
                                            </span>
                                            <input type="text" maxLength="40" placeholder='max character length  is 40' className='p-2 w-1/2 bg-white text-black rounded-md border-2 border-gray-300' />
                                        </span>
                                        <span className='flex gap-10 ' >
                                            <span className='text-lg font-bold bg-gray-800 p-2 rounded-md'>
                                                Article Link :
                                            </span>
                                            <input type="text" maxLength="40" placeholder='max character length  is 40' className='p-2 w-1/2 bg-white text-black rounded-md border-2 border-gray-300' />
                                        </span>

                                    </span>
                                ))
                            }
                            <span className='flex gap-2 justify-center'>
                                <span
                                    onClick={() => increaseSubtopic(1)}
                                    className='text-white  font-bold cursor-pointer text-sm items-center hover:scale-105 transition bg-gray-400 flex rounded-md w-[70px] p-1  gap-2 '> Add <lord-icon
                                        src="https://cdn.lordicon.com/fijxgivs.json"
                                        trigger="click"
                                        state="hover-square"
                                        colors="primary:#ffffff"
                                        style={{ width: 25, height: 25 }}>
                                    </lord-icon></span>
                                <span
                                    onClick={() => increaseSubtopic(0)}
                                    className='text-white font-bold  cursor-pointer text-sm items-center hover:scale-105 transition bg-gray-400 flex rounded-md w-[85px] p-1  gap-2 '> Delete <lord-icon
                                        src="https://cdn.lordicon.com/dygpxmzx.json"
                                        trigger="hover"
                                        state="hover-square"
                                        colors="primary:#ffffff"
                                        style={{ width: 25, height: 25 }}>
                                    </lord-icon>
                                </span>
                            </span>



                        </div>))}
                <span className='flex gap-2 ml-7'>
                    <span
                        onClick={() => increaseTopic(1)}
                        className='text-white  font-bold cursor-pointer text-sm items-center hover:scale-105 transition bg-gray-600 flex rounded-md w-[110px] p-1  gap-2 '> Add Topic <lord-icon
                            src="https://cdn.lordicon.com/fijxgivs.json"
                            trigger="click"
                            state="hover-square"
                            colors="primary:#ffffff"
                            style={{ width: 25, height: 25 }}>
                        </lord-icon></span>
                    <span
                        onClick={() => increaseTopic(0)}
                        className='text-white font-bold  cursor-pointer text-sm items-center hover:scale-105 transition bg-gray-600 flex rounded-md w-[130px] p-1  gap-2 '> Delete topic <lord-icon
                            src="https://cdn.lordicon.com/dygpxmzx.json"
                            trigger="hover"
                            state="hover-square"
                            colors="primary:#ffffff"
                            style={{ width: 25, height: 25 }}>
                        </lord-icon>
                    </span>
                </span>


            </div>
        </div>
    )
}

export default AddCourse
