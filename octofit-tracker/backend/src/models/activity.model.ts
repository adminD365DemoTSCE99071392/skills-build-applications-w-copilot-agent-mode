import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, trim: true },
  duration: { type: Number, required: true },
  distance: { type: Number, required: false },
  createdAt: { type: Date, default: () => new Date() },
});

const Activity = mongoose.models.Activity ?? mongoose.model<IActivity>('Activity', activitySchema);
export default Activity;
