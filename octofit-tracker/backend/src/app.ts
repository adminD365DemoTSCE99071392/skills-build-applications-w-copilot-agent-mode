import express, { type NextFunction, type Request, type Response } from 'express';
import healthRoutes from './routes/health.routes.js';
import userRoutes from './routes/user.routes.js';
import activityRoutes from './routes/activity.routes.js';
import teamRoutes from './routes/team.routes.js';
import workoutRoutes from './routes/workout.routes.js';
import leaderboardRoutes from './routes/leaderboard.routes.js';

const app = express();

app.use(express.json());
app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
