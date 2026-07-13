import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Team from '../models/team.model.js';
import Activity from '../models/activity.model.js';
import Workout from '../models/workout.model.js';
import Leaderboard from '../models/leaderboard.model.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      Leaderboard.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Avery Reed', email: 'avery@octofit.com' },
      { name: 'Jordan Lee', email: 'jordan@octofit.com' },
      { name: 'Sam Patel', email: 'sam@octofit.com' },
    ]);

    const teams = await Team.create([
      { name: 'Team Apex', members: [users[0]._id, users[1]._id] },
      { name: 'Team Pulse', members: [users[1]._id, users[2]._id] },
    ]);

    const workouts = await Workout.create([
      {
        title: 'Morning HIIT Blast',
        description: 'A fast-paced interval workout to boost energy and endurance.',
        duration: 30,
        difficulty: 'intermediate',
        recommendedFor: ['cardio', 'strength'],
      },
      {
        title: 'Recovery Flow',
        description: 'Low-impact mobility and stretching to support recovery.',
        duration: 20,
        difficulty: 'beginner',
        recommendedFor: ['flexibility', 'recovery'],
      },
    ]);

    await Activity.create([
      {
        user: users[0]._id,
        type: 'Run',
        duration: 45,
        distance: 8.2,
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        duration: 60,
        distance: 22.5,
      },
      {
        user: users[2]._id,
        type: 'Yoga',
        duration: 40,
      },
    ]);

    await Leaderboard.create([
      { entityType: 'user', entityName: users[0].name, score: 980, rank: 1 },
      { entityType: 'user', entityName: users[1].name, score: 920, rank: 2 },
      { entityType: 'team', entityName: teams[0].name, score: 1900, rank: 1 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
