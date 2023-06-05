import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export default function requiredUser(
  _: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user;

  logger.info(user);

  if (!user) return res.sendStatus(403);

  return next();
}
