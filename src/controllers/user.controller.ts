import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
    res.status(200).json({ 
      success: true, 
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      message: 'User logged in successfully' 
    });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
    res.status(201).json({ 
      success: true, 
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      message: 'User registered successfully' 
    });
  } catch (error: any) {
    console.error('Error registering:', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}