import { Router } from "express";
import { createUserController } from "../controllers/user.controllers";
import requestValidater from "../middlewares/requestValidater";
import { createUserSchema } from "../schemas/user.schema";

const router = Router();

// create user
router.post("/", requestValidater(createUserSchema), createUserController);

export default router;
