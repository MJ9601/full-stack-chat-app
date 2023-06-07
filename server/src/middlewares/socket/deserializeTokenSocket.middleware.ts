import { NextFunction } from "express";
import { Socket } from "socket.io";

export default async function deserializeTokenSocket(
  socket: Socket,
  next: NextFunction
) {
  const accessToken = socket.request.headers.cookie;
  console.log(accessToken);

  next();
}
