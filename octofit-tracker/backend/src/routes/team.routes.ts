import { Router } from 'express'
import { createTeam, getTeams } from '../controllers/team.controller.js'

const router = Router()
router.get('/', getTeams)
router.post('/', createTeam)

export default router
