const express = require("express");
const router = express.Router();
const { clerkClient } = require('@clerk/express');
const User = require("../models/User");
const Course = require("../models/Course");
router.post('/addUser', async (req, res) => {
    const userId = req.auth.userId;
    if (!userId) {
        return res.status(400).json({ error: 'Error: No signed-in user' });
    }
    try {

        const user = await clerkClient.users.getUser(userId);
        let user1 = await User.findOne({ clerkId: user.id });
        if(!user1){
        const newUser = new User({
            clerkId: user.id,
            email: user.primaryEmailAddress.emailAddress,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", firstTime: true });
    }else{
            res.status(201).json({ message: "Old User", firstTime: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the user' });
    }
}
);

router.get('/getCourses', async (req, res) => {
        const { search,page=1,limit=10} = req.query;
        if (!search) return res.json({ results: [] });
        try {
            const results = await Course.find(
                { $text: { $search: search } ,
                  privacy: "Public"
            } 
            )
            .skip((page - 1) * limit) 
            .limit(Number(limit)); 
         
            res.json({ results });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });


    router.get('/enrolledcourses', async (req, res) => {
        const userId = req.auth.userId;
        if (!userId) {
            return res.status(400).json({ error: 'Error: No signed-in user' });
        }
        try {
            const UserAUTH = await clerkClient.users.getUser(userId);
            const user = await User.findOne({ clerkId: UserAUTH.id });
    
            if (!user || !Array.isArray(user.enrolledcourses)) {
                return res.status(404).json({ error: "User not found or no courses" });
            }
           
            const courseMap = new Map();
            user.enrolledcourses.forEach(course => {
                courseMap.set(course.courseCode, course.courseCompletion);
            });  
            const results = await Course.find({ courseCode: { $in: Array.from(courseMap.keys()) } });
            const coursesWithCompletion = results.map(course => ({
                ...course.toObject(),
                courseCompletion: courseMap.get(course.courseCode) || [[]]
            }));
            res.json(coursesWithCompletion);
        } catch (err) {
            console.error("Error fetching courses:", err);
            res.status(500).json({ message: err.message });
        }
    });  
    
    router.get('/enroll', async (req, res) => {
        const userId = req.auth.userId;
        const { courseCode } = req.query;
       
        if (!userId) {
            return res.status(400).json({ error: 'Error: No signed-in user' });
        }
        try {
            const UserAUTH = await clerkClient.users.getUser(userId);
            const user = await User.findOne({ clerkId: UserAUTH.id });
    
            if (!user || !Array.isArray(user.enrolledcourses)) {
                return res.status(404).json({ error: "User not found or no courses" });
            }
            const ownsCourse = user.owncourses?.some(course => course.courseCode === courseCode);
            const isEnrolled = user.enrolledcourses?.some(course => course.courseCode === courseCode);

        if (ownsCourse) {
            return res.json({ status: "owned" });
        } else if (isEnrolled) {
            return res.json({ status: "enrolled" });
        } else {
            return res.json({ status: "neither" });
        }      
        } catch (err) {
            console.error("Error enrolling in course:", err);
            res.status(500).json({ message: err.message });
        }
    }
    );

    router.post('/enrolling', async (req, res) => {
        const userId = req.auth.userId;
        const { courseCode ,value} = req.body;
        if (!userId) {
            return res.status(400).json({ error: 'Error: No signed-in user' });
        }
        try {
            const UserAUTH = await clerkClient.users.getUser(userId);
            const user = await User.findOne({ clerkId: UserAUTH.id });
            if(value===1){
            const course = await Course.findOne({ courseCode });
            if (!course) {
                return res.status(404).json({ error: "Course not found" });
            }
                const completion= course.topics.map(topic => new Array(topic.subtopics.length).fill(0));
           
                user.enrolledcourses.push({
                    courseCode,
                    courseCompletion: completion
                });
                
            }else{
                    user.enrolledcourses = user.enrolledcourses.filter(course => course.courseCode !== courseCode);
                }
                await user.save();
                res.json({ message: value === 1 ? 'Enrolled successfully' : 'Unenrolled successfully' });
            
        } catch (err) {
            console.error("Error enrolling in course:", err);
            res.status(500).json({ message: err.message });
        }
    });

module.exports = router;