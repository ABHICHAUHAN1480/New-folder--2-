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
                  privacy: "public"
            } 
            )
            .skip((page - 1) * limit) 
            .limit(Number(limit)); 
            
            res.json({ results });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

module.exports = router;