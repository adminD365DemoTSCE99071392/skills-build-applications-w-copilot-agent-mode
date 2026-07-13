import { type Request, type Response } from 'express';
import Activity from '../models/activity.model.js';

export async function getActivities(req: Request, res: Response) {
  const activities = await Activity.find().populate('user').lean();
  res.json(activities);
}

export async function createActivity(req: Request, res: Response) {
  const { userId, type, duration, distance } = req.body;
  const activity = await Activity.create({
    user: userId,
    type,
    duration,
    distance,
  });
  res.status(201).json(activity);
}
