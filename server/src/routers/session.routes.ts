import { Router } from "express";
import { createSessionController } from "../controllers/session.controllers";
import requestValidater from "../middlewares/requestValidater";
import { sessionUserSchema } from "../schemas/user.schema";

const router = Router();

// create session
router.post("/", requestValidater(sessionUserSchema), createSessionController);

export default router;
