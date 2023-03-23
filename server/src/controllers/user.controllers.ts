import { Request, Response } from "express";
import { CreateUserSchema } from "../schemas/user.schema";

export const createUserController = async (
  req: Request<{}, {}, CreateUserSchema>,
  res: Response
) => {
  const { body } = req;
  try {
    return res.sendStatus(200);
  } catch (err: any) {
    return res.status(401).send("user already exists!");
  }
};
