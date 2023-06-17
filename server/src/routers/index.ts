import { Router } from "express";
import userRoutes from "./user.routes";
import sessionRoutes from "./session.routes";
import deserializeToken from "../middlewares/restApi/deserializeToken.middleware";
import { findRooms } from "../services/room.service";
import { findManyUsers } from "../services/user.service";

const router = Router();

// middleware
router.use(deserializeToken);

router.use("/users", userRoutes);
router.use("/sessions", sessionRoutes);

// testing only
router.get("/rooms", async (_, res) => {
  const rooms = await findRooms({ where: {}, include: { members: true } });
  console.log(rooms);
  res.status(200).send(rooms);
});

router.get("/users", async (_, res) => {
  const rooms = await findManyUsers({ where: {}, include: { Room: true } });
  // @ts-ignore
  console.log({ rooms: rooms.map((room) => JSON.stringify(room.Room)) });
  res.status(200).send(rooms);
});

export default router;
