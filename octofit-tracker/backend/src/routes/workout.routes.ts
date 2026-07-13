import { Router } from 'express'
import { createWorkout, getWorkouts } from '../controllers/workout.controller.js'

const router = Router()
router.get('/', getWorkouts)
router.post('/', createWorkout)

export default router
