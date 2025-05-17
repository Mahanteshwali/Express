const express = require('express');
const router = express.Router();
const usersCredentials = require('../models/UserModel');

router.get('/', async (req, res) => {
    try {
        const userDetails = await usersCredentials.find();
        res.status(200).json({ message: "userDetails sucessfully fetched", userDetails });
    }
    catch (error) {
        res.status(400).json({ message: "not found" })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userDetail = await usersCredentials.findById(req.params.id);
        if (!userDetail) {
            return res.status(400).json({ message: "user detils are not present" });
        }
        res.status(200).json({ message: "userDetail fetched Sucessfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/', async (req, res) => {
    try {
        if ((req.body.email).includes('@gmail')) {
            const { username, password, email, gender, number, date_of_birth, createdAt } = req.body;

            const userDetails = new usersCredentials({
                username, password, email, gender, number, date_of_birth, createdAt
            });
            await userDetails.save();
            res.status(201).json({ message: 'user created Sucessfullly', userDetails })
        }
        else {
            res.status(401).json({ message: 'invalid email' })
        }
    }
    catch (error) {
        res.status(400).json({ message: "error while creating a user", error })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { username, password, email, gender, number, date_of_birth, createdAt } = req.body;
        const userDetail = await usersCredentials.findByIdAndUpdate(req.params.id,
            { username, password, email, gender, number, date_of_birth, createdAt },
            { new: true });
        if (!userDetail) {
            return res.status(400).json({ message: "error " });
        }
        res.status(201).json({ message: "sucessfully upadted" });
    }
    catch (error) {
        res.status(500).json({message:"Internal server error",error})
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { username, password, email, gender, number, date_of_birth, createdAt } = req.body;
        const userDetails = await usersCredentials.findByIdAndUpdate(
            req.params.id,
            { username, password, email, gender, number, date_of_birth, createdAt },
            { new: true }
        );
        if (!userDetails) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(201).json({ message: "userDetails sucessfully updated", item });
    } catch (error) {
        res.status(500).json({ message: 'userDetail updating failed', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await usersCredentials.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "delete failed" });
        }
        res.status(200).json({ message: "User deleted sucessfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error",error });
    };
});

module.exports = router;