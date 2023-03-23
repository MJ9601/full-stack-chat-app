import { Request, Response } from "express";
import { SessionUserSchema } from "../schemas/user.schema";

export const createSessionController = async (
  req: Request<{}, {}, SessionUserSchema>,
  res: Response
) => {
  const { body } = req;
  try {
    return res.sendStatus(200);
  } catch (err: any) {
    return res.status(401).send("user already exists!");
  }
};
