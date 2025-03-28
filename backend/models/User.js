const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    owncourses: [{
        courseCode: { type: String },
        courseCompletion: {  
            type: [[Number]],  
            default: [[0] ]  
        }
    }], 
    enrolledcourses:  [{
        courseCode: { type: String },
        courseCompletion: { type: [[Number]], default: [[]] } 
    }], 
});

module.exports = mongoose.model("User", userSchema);