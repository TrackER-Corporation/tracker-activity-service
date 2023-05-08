import axios from 'axios';
import asyncHandler from 'express-async-handler';
import { collections } from '../services/database.service';
import { ObjectId } from 'mongodb';

export const createActivity = asyncHandler(async (req, res) => {
    const { userId } = req.body
    if (!userId) throw Error('Error')

    const data = await axios.get('https://geolocation-db.com/json/').then((data) => data.data)
    const activityExists = await collections?.activity?.findOne({ IPv4: data.IPv4 })
    if (activityExists) {
        const updatedUser = await collections?.activity?.findOneAndUpdate(
            { userId: new ObjectId(activityExists.userId) },
            { $set: { ...data, date: Date.now() } },
            { returnDocument: 'after' })
        if (updatedUser)
            res.status(200).json({ ...data, date: Date.now() })
    }
    else {
        const activity = await collections?.activity?.
            insertOne({
                ...data,
                userId: new ObjectId(userId)
            })
        if (activity) {
            res.status(200).json({ ...data })
        } else
            throw Error('Error')
    }

})

// @desc    Get goals
// @route   GET /activity/:id
// @access  Private
export const getActivityById = asyncHandler(async (req, res) => {
    const activity = await collections?.activity?.find({ userId: new ObjectId(req.params.id) }).toArray();
    if (!activity || activity?.length == 0) {
        throw Error('Error')
    } else {
        res.status(200)
    }
})
