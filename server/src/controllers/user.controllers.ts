import { Request, Response } from "express";
import { CreateUserSchema } from "../schemas/user.schema";
import logger from "../utils/logger";

export const createUserController = async (
  req: Request<{}, {}, CreateUserSchema>,
  res: Response
) => {
  const { body } = req;
  try {
    logger.info({ body });
    return res.status(200).send(body);
  } catch (err: any) {
    return res.status(401).send("user already exists!");
  }
};
