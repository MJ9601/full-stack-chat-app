import { Request, Response } from "express";
import { SessionUserSchema } from "../schemas/user.schema";
import { validateUsernameAndPassword } from "../services/user.service";
import { createSession } from "../services/session.service";
import { signJwt } from "../utils/jwt.utils";
import { omit } from "lodash";
import config from "config";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../utils/cookie.config";

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
      tokenPayload: { ...omit(user, ["password"]), session: newSession.id },
      isAccToken: true,
      options: { expiresIn: config.get<string>("accTokenTimeToLive") },
    });

    const refreshToken = signJwt({
      tokenPayload: { ...omit(user, ["password"]), session: newSession.id },
      isAccToken: false,
      options: { expiresIn: config.get<string>("refTokenTimeToLive") },
    });

    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    res.setHeader("x-refresh", refreshToken);
    res.setHeader("authorization", `Bearer ${accessToken}`);


    return res.status(200).send({ accessToken, refreshToken });
  } catch (err: any) {
    return res
      .status(500)
      .send({ msg: "Server Error!!", msgErr: err.message, codeErr: err });
  }
};
