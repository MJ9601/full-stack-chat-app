import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserSchema } from "../../schemas/user.schema";
import { createUser, findOneUser } from "../../services/user.service";
import logger from "../../utils/helper/logger";

export const createUserController = async (
  req: Request<{}, {}, CreateUserSchema>,
  res: Response
) => {
  const { body } = req;
  try {
    const user = await findOneUser({ where: { username: body.username } });
    if (user) return res.status(409).send("username already exists!!");
    const { confirmedPassword, ...rest } = body;

    const newUser = await createUser({ data: rest });

    return res.status(201).send(omit(newUser, "password"));
  } catch (err: any) {
    return res
      .status(500)
      .send({ msg: "Server Error!", msgErr: err.message, codeErr: err.code });
  }
};

export const getMeController = (_: Request, res: Response) => {
  try {
    return res.status(200).send(res.locals.user);
  } catch (error) {
    return res.status(500).send({ err: error, msg: error.message });
  }
};
