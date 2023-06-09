import { Request } from "express";

interface VerifyIpFunc {
  req: Request;
  ip: string;
  agent: string;
}

export default function verifyIpAndAgent({ req, ip, agent }: VerifyIpFunc) {
  const userIp =
    (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress!;
  const userAgent = req.headers["user-agent"]!;

  if (ip !== userIp || agent !== userAgent) {
    return false;
  }

  return true;
}
