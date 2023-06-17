import { Request, Response, NextFunction } from "express";
import logger from "../../utils/helper/logger";
import { get } from "lodash";

export default function requiredUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log(get(req, "user"));
  const user = res.locals.user || get(req, "user");

  // logger.info(user);

  if (!user) return res.sendStatus(403);

  return next();
}
