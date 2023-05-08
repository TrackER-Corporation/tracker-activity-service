import express from 'express'
import { createActivity, getActivityById } from '../controller/controller'

const router = express.Router()

router.post('/', createActivity)
router.get('/:id', getActivityById)

export default router