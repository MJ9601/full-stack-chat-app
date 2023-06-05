import { CookieOptions } from "express";

export const accessTokenOptions: CookieOptions = {
  maxAge: 6e5,
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

export const refreshTokenOptions: CookieOptions = {
  ...accessTokenOptions,
  maxAge: 5.184e9,
};
