import { Request, Response } from "express";
import { SessionUserSchema } from "../../schemas/user.schema";
import { validateUsernameAndPassword } from "../../services/user.service";
import { createSession } from "../../services/session.service";
import { signJwt } from "../../utils/jwt.utils";
import { omit } from "lodash";
import config from "config";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../../utils/cookie.config";
import { setUserAndSessionOnRedis } from "../../utils/socketActions/userAndSessionOnRedis.ts";

export const createSessionController = async (
  req: Request<{}, {}, SessionUserSchema>,
  res: Response
) => {
  const { body } = req;
  try {
    const user = await validateUsernameAndPassword(
      body.username,
      body.password
    );
    if (!user) return res.status(409).send("Invalid Username or Password!!");

    const newSession = await createSession({
      data: {
        userIp:
          (req.headers["x-forwarded-for"] as string) ||
          req.socket.remoteAddress!,
        userAgent: req.headers["user-agent"]!,
        userId: user.id,
      },
    });

    const accessToken = signJwt({
      tokenPayload: {
        ...omit(user, ["password", "createdAt", "updatedAt", "Room"]),
        session: newSession.id,
        userIp: newSession.userIp,
        userAgent: newSession.userAgent,
      },
      signKeyName: "accTokenPriKey",
      options: { expiresIn: config.get<string>("accTokenTimeToLive") },
    });

    const refreshToken = signJwt({
      tokenPayload: {
        ...omit(user, ["password", "Room"]),
        session: newSession.id,
        userIp: newSession.userIp,
        userAgent: newSession.userAgent,
      },
      signKeyName: "refTokenPriKey",
      options: { expiresIn: config.get<string>("refTokenTimeToLive") },
    });

    await setUserAndSessionOnRedis(user, newSession, 16 * 60);

    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    res.setHeader("x-refresh", refreshToken);
    res.setHeader("authorization", `Bearer ${accessToken}`);

    return res.status(201).send({ accessToken, refreshToken });
  } catch (err: any) {
    console.log({ err });
    return res.status(500).send({
      msgErr: err.message,
      err,
    });
  }
};
