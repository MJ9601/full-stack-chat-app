import { Request, Response } from "express";
import { SessionUserSchema } from "../schemas/user.schema";
import logger from "../utils/logger";

export const createSessionController = async (
  req: Request<{}, {}, SessionUserSchema>,
  res: Response
) => {
  const { body } = req;
  try {
    logger.info({ body });
    return res.status(200).send("ok");
  } catch (err: any) {
    return res.status(401).send("user already exists!");
  }
};
