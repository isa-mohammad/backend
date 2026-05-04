import { Router } from "express";
import { createFood, deleteFood, getAllFood, updateFood } from "../controllers/food.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.get('/', getAllFood);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

export default router;