import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { verifyJwt } from "../../utils/jwt.utils";
import { reIssueNewAccessToken } from "../../services/session.service";
import { set, get } from "lodash";

export default async function authSocketMiddleware(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  const tokens = get(socket.request.headers, "cookie")!.split("; ");

  const { accessToken, refreshToken } = tokens.reduce((pre, cur) => {
    const [key, value] = cur.split("=");
    return { ...pre, [key]: value };
  }, {}) as { accessToken?: string; refreshToken?: string };

  // console.log({ accessToken, refreshToken });

  if (!accessToken && !refreshToken) return next(new Error("UnAuthorized!!"));

  const { decoded, expired } = verifyJwt({
    token: accessToken || "",
    verifyKeyName: "accTokenPubKey",
  });

  if (decoded) return next();

  if (expired && refreshToken) {
    const newAccessToken = await reIssueNewAccessToken(refreshToken);

    set(
      socket.handshake.headers,
      "set-cookie",
      `refreshToken=${refreshToken}; accessToken=${newAccessToken}`
    );
    // socket.handshake.headers[
    //   "set-cookie"
    // ]! = `refreshToken=${refreshToken}; accessToken=${newAccessToken}`;
    socket.handshake.headers.cookie = `refreshToken=${refreshToken}; accessToken=${newAccessToken}`;

    // console.log({ setCookie: socket.handshake.headers["set-cookie"] });

    const newTokens = get(socket.request.headers, "cookie");
    // console.log({ newTokens });

    return next();
  }

  next();
}
