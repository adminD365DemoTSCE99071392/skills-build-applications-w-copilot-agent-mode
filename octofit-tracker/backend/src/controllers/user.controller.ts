import { type Request, type Response } from 'express';
import User from '../models/user.model.js';

export async function getUsers(req: Request, res: Response) {
  const users = await User.find().lean();
  res.json(users);
}

export async function createUser(req: Request, res: Response) {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.status(201).json(user);
}
