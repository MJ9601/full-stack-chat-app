import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { verifyJwt } from "../../utils/jwt.utils";
import { reIssueNewAccessToken } from "../../services/session.service";
import { set, get } from "lodash";
import { parse } from "cookie";
import logger from "../../utils/helper/logger";
import verifyIpAndAgent from "../../utils/verifyIpAndAgent";
import { Request } from "express";

export default async function authSocketMiddleware(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  const cookies = parse(String(get(socket.request.headers, "cookie")));
  // console.log(cookies);

  if (!Object.keys(cookies).length) {
    logger.error("bad request!, Socket disconnected");
    return next(new Error("UnAuthorized!!"));
  }

  // console.log(cookies);

  const { accessToken, refreshToken } = cookies;

  if (!accessToken && !refreshToken) {
    logger.error("Socket disconnected!!");
    return next(new Error("UnAuthorized!!"));
  }

  const { decoded, expired } = verifyJwt({
    token: accessToken || "",
    verifyKeyName: "accTokenPubKey",
  });

  if (decoded) {
    const verifiedBrowser = verifyIpAndAgent({
      req: socket.request as Request,
      ip: get(decoded, "userIp")!,
      agent: get(decoded, "userAgent")!,
    });

    if (!verifiedBrowser) {
      logger.error("Socket disconnected!!");
      return next(new Error("UnAuthorized!!"));
    }

    set(socket, "user", decoded);
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueNewAccessToken(
      socket.request as Request,
      refreshToken
    );

    if (!newAccessToken) {
      logger.error("Socket disconnected!!");
      return next(new Error("UnAuthorized!!"));
    }

    set(
      socket.handshake.headers,
      "cookie",
      `refreshToken=${refreshToken}; accessToken=${newAccessToken}`
    );

    const results = verifyJwt({
      token: newAccessToken as string,
      verifyKeyName: "accTokenPubKey",
    });

    set(socket, "user", results.decoded);
    // socket.handshake.headers[
    //   "set-cookie"
    // ]! = `refreshToken=${refreshToken}; accessToken=${newAccessToken}`;
    // socket.handshake.headers.cookie = `refreshToken=${refreshToken}; accessToken=${newAccessToken}`;

    // console.log({ setCookie: socket.handshake.headers["set-cookie"] });

    // const newTokens = get(socket.request.headers, "cookie");
    // console.log({ newTokens });

    return next();
  }

  next();
}
