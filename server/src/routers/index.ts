import { Router } from "express";
import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sessionRoutes);

export default router;
