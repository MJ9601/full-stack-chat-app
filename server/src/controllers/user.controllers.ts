import { Request, Response } from "express";
// import { omit } from "lodash";
import { CreateUserSchema } from "../schemas/user.schema";
import { createUser, findOneUser } from "../services/user.service";
import logger from "../utils/logger";

export const createUserController = async (
  req: Request<{}, {}, CreateUserSchema>,
  res: Response
) => {
  const { body } = req;
  try {
    logger.info({ body });
    const user = await findOneUser({ where: { username: body.username } });
    if (user) return res.status(401).send("username already exists!!");

    const newUser = await createUser({ data: body });

    return res.status(201).send(newUser);
  } catch (err: any) {
    return res.status(500).send("Server Error!");
  }
};
