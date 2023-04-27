import express from 'express'
const router = express.Router()
import { createActivity, getActivityById } from '../controller/controller'


router.post('/api/activity', createActivity)
router.get('/api/activity/:id', getActivityById)


export default router