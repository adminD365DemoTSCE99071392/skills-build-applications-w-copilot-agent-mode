import { type Request, type Response } from 'express'
import Team from '../models/team.model.js'

export async function getTeams(req: Request, res: Response) {
  const teams = await Team.find().populate('members').lean()
  res.json(teams)
}

export async function createTeam(req: Request, res: Response) {
  const { name, memberIds } = req.body
  const team = await Team.create({ name, members: memberIds })
  res.status(201).json(team)
}
