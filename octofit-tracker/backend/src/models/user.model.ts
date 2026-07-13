import mongoose, { Schema } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  createdAt: { type: Date, default: () => new Date() },
});

const User = mongoose.models.User ?? mongoose.model<IUser>('User', userSchema);
export default User;
