import { Router } from "express";
import { 
  getAllUsers, 
  getMe, 
  login, 
  register, 
  forgotPassword, 
  verifyOTP, 
  resetPassword 
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authMiddleware, getMe);
router.get('/', authMiddleware, getAllUsers);

// Password Reset Routes
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

export default router;
