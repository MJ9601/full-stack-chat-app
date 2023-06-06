import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueNewAccessToken } from "../services/session.service";
import { accessTokenOptions } from "../utils/cookie.config";
import logger from "../utils/logger";

export default async function deserializeToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken =
    get(req, "cookies.accessToken") ||
    get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  // logger.info({ accessToken });

  const refreshToken =
    get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");

  // logger.info({ refreshToken });

  if (!accessToken && !refreshToken) return next();

  const { decoded, expired } = verifyJwt({
    token: accessToken,
    isAccToken: true,
  });

  if (decoded) {
    res.locals.user = decoded;
    res.setHeader("x-refresh", refreshToken);
    res.setHeader("authorization", `Bearer ${accessToken}`);
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueNewAccessToken(refreshToken);

    if (newAccessToken) {
      res.cookie("accessToken", newAccessToken, accessTokenOptions);

      res.setHeader("x-refresh", refreshToken);
      res.setHeader("authorization", `Bearer ${newAccessToken}`);
      const results = verifyJwt({
        token: newAccessToken as string,
        isAccToken: true,
      });
      res.locals.user = results.decoded;

      return next();
    }
  }

  return next();
}
