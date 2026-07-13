import mongoose, { Schema } from 'mongoose';

export interface ILeaderboard {
  entityType: 'user' | 'team';
  entityName: string;
  score: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  entityType: { type: String, required: true, enum: ['user', 'team'] },
  entityName: { type: String, required: true, trim: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() },
});

const Leaderboard = mongoose.models.Leaderboard ?? mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
export default Leaderboard;
