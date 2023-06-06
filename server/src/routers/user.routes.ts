import { Router } from "express";
import {
  createUserController,
  getMeController,
} from "../controllers/user.controllers";
import requestValidater from "../middlewares/requestValidater.middleware";
import { createUserSchema } from "../schemas/user.schema";
import requiredUser from "../middlewares/requiredUser.middleware";
import reqRateController from "../middlewares/reqRateController.middleware.";

const router = Router();

// create user
router.post(
  "/",
  [reqRateController(30, 2), requestValidater(createUserSchema)],
  createUserController
);

// getMe
router.get("/me", [reqRateController(20, 10), requiredUser], getMeController);

export default router;
