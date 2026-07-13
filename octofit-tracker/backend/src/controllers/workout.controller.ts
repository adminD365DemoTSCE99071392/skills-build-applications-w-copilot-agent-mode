import { type Request, type Response } from 'express'
import Workout from '../models/workout.model.js'

export async function getWorkouts(req: Request, res: Response) {
  const workouts = await Workout.find().lean()
  res.json(workouts)
}

export async function createWorkout(req: Request, res: Response) {
  const { title, description, duration, difficulty, recommendedFor } = req.body
  const workout = await Workout.create({ title, description, duration, difficulty, recommendedFor })
  res.status(201).json(workout)
}
