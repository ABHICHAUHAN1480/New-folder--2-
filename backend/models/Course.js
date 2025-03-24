const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    courseInstructor: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    impPoints: {
        type: [String], 
        required: true
    },
    topics: [
        {
            id: {
                type: Number,
                required: true
            },
            topic: {
                type: String,
                required: true
            },
            completions: {
                type: [Number], 
                required: true
            },
            subtopics: {
                type: [String], 
                required: true
            }
        }
    ],
    // Keywords:{
    //     type: [String], required: true}
    
});

module.exports = mongoose.model("Course", courseSchema);
