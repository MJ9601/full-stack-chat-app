import prisma from "../database/prisma.config";
import { Prisma } from "@prisma/client";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get, omit, pick } from "lodash";
import config from "config";
import { findOneUser } from "./user.service";
import { Request } from "express";
import verifyIpAndAgent from "../utils/verifyIpAndAgent";
import {
  getUserAndSessionFromRedis,
  setUserAndSessionOnRedis,
} from "../utils/socketActions/userAndSessionOnRedis.ts";
import logger from "../utils/helper/logger";

export const createSession = async (input: Prisma.SessionCreateArgs) =>
  prisma.session.create(input);

export const findOneSession = async (input: Prisma.SessionFindUniqueArgs) =>
  prisma.session.findUnique(input);

export const findOneUserSessions = async (input: Prisma.SessionFindManyArgs) =>
  prisma.session.findMany(input);

export const updateOneSession = async (input: Prisma.SessionUpdateArgs) =>
  prisma.session.update(input);

export const deleteSessions = async (input: Prisma.SessionDeleteManyArgs) =>
  prisma.session.deleteMany(input);

export const reIssueNewAccessToken = async (req: Request, token: string) => {
  const { decoded } = verifyJwt({ token, verifyKeyName: "refTokenPubKey" });

  logger.info({ decoded, session: get(decoded, "session") });
  if (!decoded || !get(decoded, "session")) return false;
  logger.info("line33 -----");

  const verifiedBrowser = verifyIpAndAgent({
    req,
    ip: get(decoded, "userIp")!,
    agent: get(decoded, "userAgent")!,
  });
  if (!verifiedBrowser) return false;

  logger.info("line41--------");

  const sessionId = get(decoded, "session")!;
  const username = get(decoded, "username")!;

  const { userRedis, sessionIdRedis } = await getUserAndSessionFromRedis(
    username,
    sessionId
  );

  logger.info("line55--------");

  if (sessionIdRedis && userRedis) {
    const newToken = signJwt({
      tokenPayload: {
        ...userRedis,
        session: sessionIdRedis,
        userIp: get(decoded, "userIp"),
        userAgent: get(decoded, "userAgent"),
      },
      signKeyName: "accTokenPriKey",
      options: { expiresIn: config.get("accTokenTimeToLive") },
    });

    return newToken;
  }
  logger.info("-------");

  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session || !session.valid) return false;

  const user = await findOneUser({
    where: { id: session.userId },
    include: {
      Room: {
        select: {
          id: true,
          name: true,
          redisId: true,
          isPrivate: true,
          members: { select: { id: true, username: true } },
        },
      },
    },
  });
  console.log(user);
  if (!user) return false;

  const newToken = signJwt({
    tokenPayload: {
      ...omit(user, ["password", "createdAt", "updatedAt", "Room"]),
      session: session.id,
      userIp: get(decoded, "userIp"),
      userAgent: get(decoded, "userAgent"),
    },
    signKeyName: "accTokenPriKey",
    options: { expiresIn: config.get("accTokenTimeToLive") },
  });

  await setUserAndSessionOnRedis(user, session, 16 * 60);

  return newToken;
};
