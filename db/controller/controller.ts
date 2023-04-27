import axios from 'axios';
import asyncHandler from 'express-async-handler';
import { collections } from '../services/database.service';
const ObjectId = require("mongodb").ObjectId;

export const createActivity = asyncHandler(async (req, res) => {
    const { userId } = req.body
    const data = await axios.get('https://geolocation-db.com/json/').then((data) => data.data)
    if (userId == null) {
        res.status(400)
        return
    }
    const activityExists = await collections?.activity?.findOne({ IPv4: data.IPv4 })
    if (activityExists) {
        const updatedUser = await collections?.activity?.findOneAndUpdate(
            { userId: activityExists.userId },
            { ...data, date: Date.now() }, {})
        if (updatedUser)
            res.status(200).json({ ...data, date: Date.now() })
    }
    else {
        const activity = await collections?.activity?.insertOne({
            ...data,
            userId,
        })
        if (activity) {
            res.status(201).json({ ...data })
        } else {
            res.status(400)
        }
    }

})

// @desc    Get goals
// @route   GET /activity/:id
// @access  Private
export const getActivityById = asyncHandler(async (req, res) => {
    const activity = await collections?.activity?.find({ userId: new ObjectId(req.params.id) }).toArray();
    if (!activity || activity.length == 0) {
        res.status(401)
    } else {
        res.status(200)
    }
})
