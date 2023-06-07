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

  // console.log({
  //   token: req.headers.cookie,
  //   token2: req.headers.authorization,
  //   token3: req.headers["x-refresh"],
  // });

  const refreshToken =
    get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");

  // logger.info({ refreshToken });

  if (!accessToken && !refreshToken) return next();

  const { decoded, expired } = verifyJwt({
    token: accessToken,
    verifyKeyName: "accTokenPubKey",
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
        verifyKeyName: "accTokenPubKey",
      });
      res.locals.user = results.decoded;

      return next();
    }
  }

  return next();
}
