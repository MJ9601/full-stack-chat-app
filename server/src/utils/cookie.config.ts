import { CookieOptions } from "express";

export const accessTokenOptions: CookieOptions = {
  maxAge: 6e5,
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
  secure: process.env.NODE_ENV == "production",
};

export const refreshTokenOptions: CookieOptions = {
  ...accessTokenOptions,
  maxAge: 5.184e9,
};
