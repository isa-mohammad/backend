import { Router } from "express";
import { getAllUsers, login, register } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/', authMiddleware, getAllUsers);

export default router;
