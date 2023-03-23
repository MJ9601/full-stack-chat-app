import { Router } from "express";
import { createUserController } from "../controllers/user.controllers";
import requestValidater from "../middlewares/requestValidater";
import { sessionUserSchema } from "../schemas/user.schema";

const router = Router();

// create user
router.post("/", requestValidater(sessionUserSchema), createUserController);

export default router;
