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

export const createSession = async (input: Prisma.SessionCreateArgs) =>
  prisma.session.create(input);

export const findOneSession = async (input: Prisma.SessionFindUniqueArgs) =>
  prisma.session.findUnique(input);

export const findOneUserSessions = async (input: Prisma.SessionFindManyArgs) =>
  prisma.session.findMany(input);

export const updateOneSession = async (input: Prisma.SessionUpdateArgs) =>
  prisma.session.update(input);

export const deleteOneUserSessions = async (
  input: Prisma.SessionDeleteManyArgs
) => prisma.session.deleteMany(input);

export const reIssueNewAccessToken = async (req: Request, token: string) => {
  const { decoded } = verifyJwt({ token, verifyKeyName: "refTokenPubKey" });
  if (!decoded || !get(decoded, "session")) return false;

  const verifiedBrowser = verifyIpAndAgent({
    req,
    ip: get(decoded, "userIp")!,
    agent: get(decoded, "userAgent")!,
  });
  if (!verifiedBrowser) return false;

  const sessionId = get(decoded, "session")!;
  const userId = get(decoded, "id")!;

  const { userRedis, sessionIdRedis } = await getUserAndSessionFromRedis(
    userId,
    sessionId
  );

  if (sessionIdRedis && userRedis) {
    const newToken = signJwt({
      tokenPayload: { ...userRedis, session: sessionIdRedis },
      signKeyName: "accTokenPriKey",
      options: { expiresIn: config.get("accTokenTimeToLive") },
    });

    return newToken;
  }

  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session || !session.valid) return false;

  const user = await findOneUser({ where: { id: session.userId } });
  if (!user) return false;

  const newToken = signJwt({
    tokenPayload: { ...omit(user, ["password"]), session: session.id },
    signKeyName: "accTokenPriKey",
    options: { expiresIn: config.get("accTokenTimeToLive") },
  });

  await setUserAndSessionOnRedis(user, session, 16 * 60);

  return newToken;
};
