import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import Hobby from "../models/Hobby";

export const createHobby = async (req: AuthRequest, res: Response) => {
    try {
        const { name, description } = req.body;
        // Use the authenticated user's ID from req.user
        const hobby = await Hobby.create({ name, user: req.user, description });
        res.status(201).json({ success: true, data: hobby });
    } catch (error) {
        console.error('Error creating hobby:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const getAllHobbies = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.query.page || !req.query.limit) {
            return res.status(400).json({ success: false, message: 'Page and limit are required' });
        }
        const page = parseInt(req.query.page as string);
        const limit = parseInt(req.query.limit as string);

        let search = "";
        if (req.query.search && typeof req.query.search === "string") {
            search = req.query.search;
        }

        // Get total count for pagination
        const total = await Hobby.countDocuments({ user: req.user, name: { $regex: search, $options: 'i' } });

        // Filter by the authenticated user's ID
        const hobbies = await Hobby.find({ user: req.user, name: { $regex: search || "", $options: 'i' } })
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            success: true,
            data: hobbies,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error getting hobbies:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const updateHobby = async (req: AuthRequest, res: Response) => {
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

export const deleteHobby = async (req: AuthRequest, res: Response) => {
    try {
        const hobby = await Hobby.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: hobby });
    } catch (error) {
        console.error('Error deleting hobby:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}