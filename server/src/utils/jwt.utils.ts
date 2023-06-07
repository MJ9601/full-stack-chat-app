import jwt from "jsonwebtoken";
import config from "config";

const decodedStringBase64 = (key: string) =>
  Buffer.from(key, "base64").toString("ascii");

type JwtPayload = {
  tokenPayload: Object;
  options: jwt.SignOptions | undefined;
  token: string;
  signKeyName: "accTokenPriKey" | "refTokenPriKey";
  verifyKeyName: "accTokenPubKey" | "refTokenPubKey";
};

export const signJwt = ({
  signKeyName,
  options,
  tokenPayload,
}: Omit<JwtPayload, "token" | "verifyKeyName">) =>
  jwt.sign(tokenPayload, decodedStringBase64(config.get<string>(signKeyName)), {
    ...(options && options),
    algorithm: "RS256",
  });

export const verifyJwt = ({
  token,
  verifyKeyName,
}: Pick<JwtPayload, "token" | "verifyKeyName">) => {
  try {
    const tokenKey = decodedStringBase64(config.get<string>(verifyKeyName));
    const decoded = jwt.verify(token, tokenKey);
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
