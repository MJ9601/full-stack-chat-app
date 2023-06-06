import { Router } from "express";
import { createSessionController } from "../controllers/session.controllers";
import requestValidater from "../middlewares/requestValidater.middleware";
import { sessionUserSchema } from "../schemas/user.schema";
import reqRateController from "../middlewares/reqRateController.middleware.";

const router = Router();

// create session
router.post(
  "/",
  [reqRateController(30, 2), requestValidater(sessionUserSchema)],
  createSessionController
);

export default router;
