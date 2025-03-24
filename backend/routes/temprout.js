const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const { clerkClient } = require('@clerk/express');
// router.post('/addCourse', async (req, res) => {
//     const gettodo = req.body.gettodo; 

//     const course = new Course({
//         courseName: "AI-Powered Software Development",
//         courseCode: "AI-SD404",
//         courseInstructor: "Dr. Sophia Martinez",
//         courseDescription: "An advanced course on integrating AI techniques into software development for automation, optimization, and intelligent decision-making.",
//         impPoints: [
//             "Understand AI-assisted software development",
//             "Implement AI-driven code generation and testing",
//             "Leverage machine learning models for optimization",
//             "Integrate NLP, computer vision, and AI analytics"
//         ],
//         topics: [
//             {
//                 id: 1,
//                 topic: "AI for Code Generation",
//                 completions: [1, 0, 1, 1, 0],
//                 subtopics: ["GitHub Copilot", "ChatGPT API", "Codex", "AI-based Refactoring", "Automated Code Reviews"]
//             },
//             {
//                 id: 2,
//                 topic: "Machine Learning in Software",
//                 completions: [0, 1, 0, 1, 1],
//                 subtopics: ["Supervised & Unsupervised Learning", "TensorFlow", "PyTorch", "AutoML", "Model Deployment"]
//             },
//             {
//                 id: 3,
//                 topic: "AI-Enhanced Testing & Debugging",
//                 completions: [0, 1, 1, 0, 0],
//                 subtopics: ["Automated Unit Testing", "AI-based Debugging", "Mutation Testing", "Fuzz Testing", "AI-powered CI/CD"]
//             },
//             {
//                 id: 4,
//                 topic: "Natural Language Processing (NLP) for Developers",
//                 completions: [1, 0, 1, 0, 1],
//                 subtopics: ["NLP Basics", "Sentiment Analysis", "Chatbots & Virtual Assistants", "Text Summarization", "AI-Powered Documentation"]
//             },
//             {
//                 id: 5,
//                 topic: "Computer Vision in Software Applications",
//                 completions: [0, 1, 0, 1, 1],
//                 subtopics: ["Image Recognition", "Object Detection", "OCR (Optical Character Recognition)", "Facial Recognition", "Video Analytics"]
//             },
//             {
//                 id: 6,
//                 topic: "AI in Cybersecurity",
//                 completions: [1, 0, 1, 0, 0],
//                 subtopics: ["Anomaly Detection", "AI-based Intrusion Prevention", "Phishing Detection", "Automated Security Audits", "Threat Intelligence"]
//             },
//             {
//                 id: 7,
//                 topic: "AI-Powered DevOps",
//                 completions: [0, 1, 0, 1, 0],
//                 subtopics: ["AI-Driven Monitoring", "Predictive Maintenance", "Self-Healing Infrastructure", "Performance Optimization", "Intelligent Load Balancing"]
//             },
//             {
//                 id: 8,
//                 topic: "Ethics & AI Regulations",
//                 completions: [1, 0, 1, 0, 1],
//                 subtopics: ["AI Bias & Fairness", "GDPR & AI Compliance", "Explainable AI", "Responsible AI Practices", "Privacy-Preserving AI"]
//             },
//             {
//                 id: 9,
//                 topic: "Future Trends in AI-Powered Software Development",
//                 completions: [0, 1, 0, 1, 1],
//                 subtopics: ["Low-Code/No-Code AI", "Quantum Computing & AI", "AI-Augmented Programming", "AI-Generated UI/UX", "Autonomous Systems"]
//             }
//         ]
//     });

//     if (gettodo === "true") {
//         try {
//             const savedCourse = await course.save();
//             res.json(savedCourse);
//         } catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     } else {
//         res.status(400).json({ message: "Invalid request" });
//     }
// });




router.get('/getCourses', async (req, res) => {
    const userId = req.auth.userId;
    if (!userId) {
        return res.status(400).json({ error: 'Error: No signed-in user' });
      }
    try {
        // const User = await clerkClient.users.getUser(userId);
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

module.exports = router;
