const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const { clerkClient } = require('@clerk/express');
const User = require("../models/User");
router.post('/addCourse', async (req, res) => {
    const userId = req.auth.userId;
    // console.log(userId);
    
    if (!userId) {
        return res.status(400).json({ error: 'Error: No signed-in user' });
    }
    const User = await clerkClient.users.getUser(userId);

    const {courseName, courseDescription, privacy,courseInstructor,courseCode,keywords,importantPoints,topics } = req.body;

    //  console.log(req.body);
    const course = new Course({
        courseName: courseName,
        courseDescription: courseDescription,
        privacy: privacy,
        courseInstructor: courseInstructor,
        courseCode: courseCode,
        Keywords: keywords,
        impPoints: importantPoints,
        topics: topics
    });
    course.save();

    res.json({ message: 'Course added' });
    
});




router.get('/getCourses', async (req, res) => {
    const userId = req.auth.userId;
    if (!userId) {
        return res.status(400).json({ error: 'Error: No signed-in user' });
    }
    try {
        const UserAUTH = await clerkClient.users.getUser(userId);
        const user = await User.findOne({ clerkId: UserAUTH.id });

        if (!user || !Array.isArray(user.owncourses)) {
            return res.status(404).json({ error: "User not found or no courses" });
        }
       
        const courseMap = new Map();
        user.owncourses.forEach(course => {
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

module.exports = router;
