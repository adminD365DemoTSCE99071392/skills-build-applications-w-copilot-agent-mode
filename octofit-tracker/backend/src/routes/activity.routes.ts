import { Router } from 'express';
import { createActivity, getActivities } from '../controllers/activity.controller.js';

const router = Router();
router.get('/', getActivities);
router.post('/', createActivity);

export default router;
