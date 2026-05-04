import { AuthRequest } from "../middlewares/auth";
import Food from "../models/Food"
import type { Response } from "express";

export const getAllFood = async (req: AuthRequest, res: Response) => {
    try {
        const foods = await Food.find({
            user: req.user
        })
        return res.status(200).json({
            success: true,
            data: foods
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export const createFood = async (req: AuthRequest, res: Response) => {
    try {
        const food = await Food.create({
            ...req.body,
            user: req.user
        })
        return res.status(201).json({
            success: true,
            data: food
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export const updateFood = async (req: AuthRequest, res: Response) => {
    try {
        // find by id and update.
        const { id } = req.params
        const { item, quantity } = req.body

        const food = await Food.findByIdAndUpdate(
            id,
            {
                item,
                quantity,
                user: req.user
            },
            { new: true }
        )
        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'Food not found'
            })
        }
        return res.status(200).json({
            success: true,
            data: food
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export const deleteFood = async (req: AuthRequest, res: Response) => {
    try {
        const food = await Food.findById(req.params.id)
        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'Food not found'
            })
        }
        if (food.user.toString() !== req.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }
        await food.deleteOne()
        return res.status(200).json({
            success: true,
            data: food
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}
