import mongoose, { Schema } from 'mongoose';

export interface IWorkout {
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  recommendedFor: string[];
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  duration: { type: Number, required: true },
  difficulty: { type: String, required: true, trim: true },
  recommendedFor: [{ type: String, trim: true }],
  createdAt: { type: Date, default: () => new Date() },
});

const Workout = mongoose.models.Workout ?? mongoose.model<IWorkout>('Workout', workoutSchema);
export default Workout;
