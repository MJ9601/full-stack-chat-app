import { Router } from "express";
import { createSessionController } from "../controllers/session.controllers";
import requestValidater from "../middlewares/requestValidater";
import { createUserSchema } from "../schemas/user.schema";

const router = Router();

// create session
router.post("/", requestValidater(createUserSchema), createSessionController);

export default router;
