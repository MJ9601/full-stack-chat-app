import prisma from "../database/prisma.config";
import { Prisma } from "@prisma/client";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get, omit } from "lodash";
import config from "config";
import { findOneUser } from "./user.service";

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

export const reIssueNewAccessToken = async (token: string) => {
  const { decoded } = verifyJwt({ token, isAccToken: false });
  if (!decoded || !get(decoded, "session")) return false;

  const sessionId = get(decoded, "session");
  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session || !session.valid) return false;

  const user = await findOneUser({ where: { id: session.userId } });
  if (!user) return false;

  const newToken = signJwt({
    tokenPayload: { ...omit(user, ["password"]), session: session.id },
    isAccToken: true,
    options: { expiresIn: config.get("accTokenTimeToLive") },
  });

  return newToken;
};
