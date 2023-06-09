import { Request, Response, NextFunction } from "express";
import redisClient from "../../database/redis.config";
import logger from "../../utils/logger";

const reqRateController =
  (seconds: number, reqNum: number) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const userIp =
      (req.headers["x-forwarded-for"] as string) ||
      req.socket.remoteAddress! ||
      req.connection.remoteAddress!;
    const userAgent = req.headers["user-agent"]!;
    // logger.info({ userIp, userAgent });
    // const randomId = createRandomId(10);

    const [response] = (await redisClient
      ?.multi()
      .incr(userIp)
      .expire(userIp, seconds)
      .exec()!) as any[];

    logger.info(String(response[1]));
    if (response[1] > reqNum) return res.status(429).send("Too many request!!");

    next();
  };

export default reqRateController;
