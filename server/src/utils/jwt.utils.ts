import jwt from "jsonwebtoken";
import config from "config";

const decodedStringBase64 = (key: string) =>
  Buffer.from(key, "base64").toString("ascii");

const accTokenPriKey = decodedStringBase64(
  config.get<string>("accTokenPriKey")
);
const refTokenPriKey = decodedStringBase64(
  config.get<string>("refTokenPriKey")
);
const refTokenPubKey = decodedStringBase64(
  config.get<string>("refTokenPubKey")
);
const accTokenPubKey = decodedStringBase64(
  config.get<string>("accTokenPubKey")
);

type JwtPayload = {
  tokenPayload: Object;
  isAccToken: boolean;
  options: jwt.SignOptions | undefined;
  token: string;
};

export const signJwt = ({
  isAccToken,
  options,
  tokenPayload,
}: Omit<JwtPayload, "token">) =>
  isAccToken
    ? jwt.sign(tokenPayload, accTokenPriKey, {
        ...(options && options),
        algorithm: "RS256",
      })
    : jwt.sign(tokenPayload, refTokenPriKey, {
        ...(options && options),
        algorithm: "RS256",
      });

export const verifyJwt = ({
  token,
  isAccToken,
}: Pick<JwtPayload, "token" | "isAccToken">) => {
  try {
    const decoded = isAccToken
      ? jwt.verify(token, accTokenPubKey)
      : jwt.verify(token, refTokenPubKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message,
      decoded: null,
    };
  }
};
