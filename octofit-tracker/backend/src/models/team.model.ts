import mongoose, { Schema } from 'mongoose';

export interface ITeam {
  name: string;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, trim: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  createdAt: { type: Date, default: () => new Date() },
});

const Team = mongoose.models.Team ?? mongoose.model<ITeam>('Team', teamSchema);
export default Team;
