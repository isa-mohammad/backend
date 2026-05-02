import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Hobby from '../models/Hobby';
import connectDB from '../config/db';

// Load env vars so we have MONGO_URI
dotenv.config();

// Connect to the database
connectDB();

const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
  },
];

const seedDB = async () => {
  try {
    // Delete existing users and hobbies to prevent duplicates
    await User.deleteMany();
    await Hobby.deleteMany();
    console.log('Database cleared of existing users and hobbies');

    // Insert new dummy users and capture the inserted documents
    const createdUsers = await User.insertMany(users);
    console.log('Dummy users successfully seeded!');

    // Create some hobbies tied to the newly created users
    const hobbies = [
      {
        name: 'Photography',
        description: 'Taking pictures of landscapes and wildlife',
        user: createdUsers[0]._id, // John Doe
      },
      {
        name: 'Coding',
        description: 'Writing TypeScript and building web applications',
        user: createdUsers[0]._id, // John Doe
      },
      {
        name: 'Cooking',
        description: 'Baking sourdough bread',
        user: createdUsers[1]._id, // Jane Smith
      },
    ];

    await Hobby.insertMany(hobbies);
    console.log('Dummy hobbies successfully seeded!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
