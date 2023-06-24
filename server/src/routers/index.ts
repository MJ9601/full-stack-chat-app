import { Router } from "express";
import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";
import deserializeToken from "../middlewares/restApi/deserializeToken.middleware";

import testRouter from "./test.routes";

const router = Router();

router.use("/test", testRouter);
// middleware
router.use(deserializeToken);

router.use("/users", userRoutes);
router.use("/sessions", sessionRoutes);

export default router;
