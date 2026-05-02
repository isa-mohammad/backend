import { Request, Response } from "express";
import Hobby from "../models/Hobby";

export const createHobby = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const hobby = await Hobby.create({ name, user: req.body.userId, description });
        res.status(201).json({ success: true, data: hobby });
    } catch (error) {
        console.error('Error creating hobby:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const getAllHobbies = async (req: Request, res: Response) => {
    try {
        if (!req.query.userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }
        if (!req.query.page || !req.query.limit) {
            return res.status(400).json({ success: false, message: 'Page and limit are required' });
        }
        const page = parseInt(req.query.page as string);
        const limit = parseInt(req.query.limit as string);
        const hobbies = await Hobby.find({ user: req.query.userId }).skip((page - 1) * limit).limit(limit);
        res.status(200).json({ success: true, data: hobbies });
    } catch (error) {
        console.error('Error getting hobbies:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const updateHobby = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const hobby = await Hobby.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
        if (!hobby) {
            return res.status(404).json({ success: false, message: 'Hobby not found' });
        }
        res.status(200).json({ success: true, data: hobby });
    } catch (error) {
        console.error('Error updating hobby:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const deleteHobby = async (req: Request, res: Response) => {
    try {
        const hobby = await Hobby.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: hobby });
    } catch (error) {
        console.error('Error deleting hobby:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}