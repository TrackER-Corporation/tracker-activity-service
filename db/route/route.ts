import express from 'express'
const router = express.Router()
import { createActivity, getActivityById } from '../controller/controller'


router.post('/', createActivity)
router.get('/:id', getActivityById)


export default router