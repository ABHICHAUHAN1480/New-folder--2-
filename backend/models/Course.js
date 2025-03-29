const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true,
        Unique: true
    },
    courseInstructor: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    privacy: {
        type: String,
        required: true
    },
    impPoints: {
        type: [String], 
        required: true
    },
    topics: [
        {
            topicName: {
                type: String,
                required: true
            },
            subtopics:[ {
            
                videoLink: {
                    type: String,
                    required: true
                },
                subtopicName: {
                    type: String,
                    required: true
                },
                articleLink:{
                    type: String,
                    
                }
            }]
        }
    ],
    Keywords:{type: [String], required: true},
        
    
});

module.exports = mongoose.model("Course", courseSchema);
