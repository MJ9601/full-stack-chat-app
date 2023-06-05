import { Router } from "express";
import {
  createUserController,
  getMeController,
} from "../controllers/user.controllers";
import requestValidater from "../middlewares/requestValidater";
import { createUserSchema } from "../schemas/user.schema";
import requiredUser from "../middlewares/requiredUser";

const router = Router();

// create user
router.post("/", requestValidater(createUserSchema), createUserController);

// getMe
router.get("/me", requiredUser, getMeController);

export default router;
