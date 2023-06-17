import { Request } from "express";
import logger from "./helper/logger";

interface VerifyIpFunc {
  req: Request;
  ip: string;
  agent: string;
}

export default function verifyIpAndAgent({ req, ip, agent }: VerifyIpFunc) {
  const userIp =
    (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress!;
  const userAgent = req.headers["user-agent"]!;

  // logger.info({ userIp, userAgent, ip, agent });

  if (ip !== userIp || agent !== userAgent) {
    return false;
  }

  return true;
}
