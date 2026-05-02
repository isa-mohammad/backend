import { Router } from "express";
import { createHobby, deleteHobby, getAllHobbies, updateHobby } from "../controllers/hobby.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Protect all routes below this line
router.use(authMiddleware);

router.post('/', createHobby);
router.put('/:id', updateHobby);
router.delete('/:id', deleteHobby);
router.get('/', getAllHobbies);

export default router;