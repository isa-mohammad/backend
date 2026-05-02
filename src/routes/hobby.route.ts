import { Router } from "express";
import { createHobby, deleteHobby, getAllHobbies, updateHobby } from "../controllers/hobby.controller";

const router = Router();

router.post('/', createHobby);
router.put('/:id', updateHobby);
router.delete('/:id', deleteHobby);
router.get('/', getAllHobbies);

export default router;