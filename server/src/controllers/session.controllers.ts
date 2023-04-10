import { Request, Response } from "express";
import { SessionUserSchema } from "../schemas/user.schema";
import { validateUsernameAndPassword } from "../services/session.service";
import logger from "../utils/logger";

export const createSessionController = async (
  req: Request<{}, {}, SessionUserSchema>,
  res: Response
) => {
  const { body } = req;
  try {
    logger.info({ body });
    const user = await validateUsernameAndPassword(
      body.username,
      body.password
    );
    if (!user) return res.status(400).send("Invalid Username or Password!!");

    return res.status(200).send(body);
  } catch (err: any) {
    return res.status(401).send("Server Error!!");
  }
};
