import { Router } from "express";
import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";

const router = Router();
router.get("/i", (_, res) => res.sendStatus(200));

router.use("/users", userRoutes);
router.use("/sessions", sessionRoutes);

export default router;
