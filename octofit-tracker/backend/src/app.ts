import express, { type NextFunction, type Request, type Response } from 'express';
import healthRoutes from './routes/health.routes.js';
import userRoutes from './routes/user.routes.js';
import activityRoutes from './routes/activity.routes.js';

const app = express();

app.use(express.json());
app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
