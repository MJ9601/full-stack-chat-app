import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { verifyJwt } from "../../utils/jwt.utils";
import { reIssueNewAccessToken } from "../../services/session.service";
import { set, get } from "lodash";
import { parse } from "cookie";
import logger from "../../utils/logger";

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

  if (decoded) return next();

  if (expired && refreshToken) {
    const newAccessToken = await reIssueNewAccessToken(refreshToken);

    if (!newAccessToken) {
      logger.error("Socket disconnected!!");
      return next(new Error("UnAuthorized!!"));
    }

    set(
      socket.handshake.headers,
      "cookie",
      `refreshToken=${refreshToken}; accessToken=${newAccessToken}`
    );

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
