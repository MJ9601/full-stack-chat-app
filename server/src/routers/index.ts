import { Router } from "express";
import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";
import deserializeToken from "../middlewares/deserializeToken.middleware";

const router = Router();

// middleware
router.use(deserializeToken);

router.use("/users", userRoutes);
router.use("/sessions", sessionRoutes);

export default router;
