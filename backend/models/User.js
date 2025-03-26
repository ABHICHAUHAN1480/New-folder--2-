const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    owncourses: { type: [String] },
    enrolledcourses: { type: [String] },
});

module.exports = mongoose.model("User", userSchema);