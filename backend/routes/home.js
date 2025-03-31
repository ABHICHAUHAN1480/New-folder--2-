const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const { clerkClient } = require('@clerk/express');
const User = require("../models/User");


router.get('/homecourse', async (req, res) => {
    const userId = req.auth.userId;
    if (!userId) {
        return res.status(400).json({ error: 'Error: No signed-in user' });
    }
    try {
        const UserAUTH = await clerkClient.users.getUser(userId);
        const user = await User.findOne({ clerkId: UserAUTH.id });
        const allCourses= await Course.find({ privacy: "Public" });

        const userOwnedCourses = user.owncourses.map(course => course.courseCode);
        const userEnrolledCourses = user.enrolledcourses.map(course => course.courseCode);
        const filteredCourses = allCourses.filter(course => 
            !userOwnedCourses.includes(course.courseCode) &&
            !userEnrolledCourses.includes(course.courseCode)
        );

        res.json({ courses: filteredCourses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching courses' });
    }
});

module.exports = router;