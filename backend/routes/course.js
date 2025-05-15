const express = require("express");
const router = express.Router();
const { clerkClient } = require('@clerk/express');
const User = require("../models/User");
const Course = require("../models/Course");



router.post('/updatecompletion', async (req, res) => {
    const userId = req.auth.userId;
    if (!userId) {
        return res.status(400).json({ error: 'Error: No signed-in user' });
    }

    const { courseCode, topicIndex, subtopicIndex, value } = req.body;

    try {
        const user = await User.findOne({ clerkId: userId });

        if (!user || (!Array.isArray(user.owncourses) && !Array.isArray(user.enrolledcourses))) {
            return res.status(404).json({ error: "User not found or no courses" });
        }

        let courseIndex = -1;
        let courseCompletion = null;
        let courseArray = value == 0 ? user.owncourses : user.enrolledcourses; // Choose the correct course list

        courseIndex = courseArray.findIndex(course => course.courseCode === courseCode);
        
        if (courseIndex === -1) {
            return res.status(404).json({ error: "Course not found in user's courses" });
        }

        let selectedCourse = courseArray[courseIndex];

        if (!selectedCourse || !selectedCourse.courseCompletion) {
            return res.status(404).json({ error: "Course found, but no progress data available" });
        }

        courseCompletion = selectedCourse.courseCompletion;

        // Ensure topicIndex exists
        if (!courseCompletion[topicIndex]) {
            return res.status(400).json({ error: `Invalid topic index: ${topicIndex}` });
        }

        // Ensure subtopicIndex exists
        if (courseCompletion[topicIndex][subtopicIndex] === undefined) {
            return res.status(400).json({ error: `Invalid subtopic index: ${subtopicIndex}` });
        }

        // Toggle completion status
        courseCompletion[topicIndex][subtopicIndex] = courseCompletion[topicIndex][subtopicIndex] === 0 ? 1 : 0;

        // Save back to user object
        courseArray[courseIndex].courseCompletion = courseCompletion;

        await user.save();

        res.json({ message: 'Course completion updated successfully' });
    } catch (error) {
        console.error("Update Completion Error:", error);
        res.status(500).json({ error: error.message });
    }
});

 router.get('/completion',async (req, res) => {
    const userId = req.auth.userId;
    const { courseCode } = req.query;
    
    if (!userId) {
        return res.status(400).json({ error: 'Error: No signed-in user' });
    }
    try {
         const UserAUTH = await clerkClient.users.getUser(userId);
        const user = await User.findOne({ clerkId: UserAUTH.id });

        if (!user || !Array.isArray(user.owncourses)) {
            return res.status(200).json({ msg: "User not found or no courses" });
        }
          
        const course = user.owncourses.find(course => course.courseCode === courseCode);
        if (!course) {
            return res.status(200).json({ error: "Course not found" });
        }
        res.json({ msg:"found",
            courseCompletion: course.courseCompletion });
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching course completion' });
    }
}
);

router.post('/updaterevision',async (req, res) => {
    const userId = req.auth.userId;
    if (!userId) {
        return res.status(400).json({ error: 'Error: No signed-in user' });
    }

    const { courseCode, topicIndex, subtopicIndex, value } = req.body;

    try {
        const user = await User.findOne({ clerkId: userId });

        if (!user || (!Array.isArray(user.owncourses) && !Array.isArray(user.enrolledcourses))) {
            return res.status(404).json({ error: "User not found or no courses" });
        }

        let courseIndex = -1;
        let courseRevision = null;
        let courseArray = value == 0 ? user.owncourses : user.enrolledcourses; 

        courseIndex = courseArray.findIndex(course => course.courseCode === courseCode);
        
        if (courseIndex === -1) {
            return res.status(404).json({ error: "Course not found in user's courses" });
        }

        let selectedCourse = courseArray[courseIndex];

        if (!selectedCourse || !selectedCourse.courseRevision) {
            return res.status(404).json({ error: "Course found, but no progress data available" });
        }

        courseRevision = selectedCourse.courseRevision;

        if (!courseRevision[topicIndex]) {
            return res.status(400).json({ error: `Invalid topic index: ${topicIndex}` });
        }

        if (courseRevision[topicIndex][subtopicIndex] === undefined) {
            return res.status(400).json({ error: `Invalid subtopic index: ${subtopicIndex}` });
        }

       
        courseRevision[topicIndex][subtopicIndex] = courseRevision[topicIndex][subtopicIndex] === 0 ? 1 : 0;

        
        courseArray[courseIndex].courseRevision = courseRevision;

        await user.save();

        res.json({ message: 'Course completion updated successfully' });
    } catch (error) {
        console.error("Update Completion Error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;