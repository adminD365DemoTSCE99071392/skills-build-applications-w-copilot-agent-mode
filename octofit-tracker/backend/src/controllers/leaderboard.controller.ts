import { type Request, type Response } from 'express'
import Leaderboard from '../models/leaderboard.model.js'

export async function getLeaderboard(req: Request, res: Response) {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean()
  res.json(leaderboard)
}
