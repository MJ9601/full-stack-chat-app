import { Router } from "express";
import { findRooms } from "../services/room.service";
import { findManyUsers } from "../services/user.service";
import { deleteManyUsers } from "../services/user.service";
import { removeRooms } from "../services/room.service";
import { deleteSessions } from "../services/session.service";

const router = Router();
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

router.delete("/users", async (_, res) => {
  try {
    const users = await deleteManyUsers({ where: {} });
    return res.status(200).send("removed!!");
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});


router.delete("/sessions", async (_, res) => {
  try {
    const users = await deleteSessions({ where: {} });
    return res.status(200).send("removed!!");
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

router.delete("/rooms", async (_, res) => {
  try {
    const rooms = await removeRooms({ where: {} });
    return res.status(200).send("removed!!");
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

export default router;
