import { Router } from "express";
import { getAllUsers, getMe, login, register } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authMiddleware, getMe);
router.get('/', authMiddleware, getAllUsers);

export default router;
