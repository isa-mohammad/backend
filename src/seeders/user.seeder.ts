import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Hobby from '../models/Hobby';
import Food from '../models/Food';
import connectDB from '../config/db';
import { users, getHobbies, getFoods } from './const';

// Load env vars so we have MONGO_URI
dotenv.config();

// Connect to the database
connectDB();

const seedDB = async () => {
  try {
    // Delete existing records to prevent duplicates
    await User.deleteMany();
    await Hobby.deleteMany();
    await Food.deleteMany();
    console.log('Database cleared of existing records (Users, Hobbies, Foods)');

    // Use User.create for the users array to trigger the pre-save password hashing hook
    const createdUsers = await User.create(users);
    console.log('Dummy users successfully seeded!');

    // Create some hobbies tied to the newly created users
    const hobbies = getHobbies(createdUsers);
    await Hobby.insertMany(hobbies);
    console.log('Dummy hobbies successfully seeded!');

    // Create some foods tied to the newly created users
    const foods = getFoods(createdUsers);
    await Food.insertMany(foods);
    console.log('Dummy foods successfully seeded!');

    console.log('--- Seeding Completed Successfully ---');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
