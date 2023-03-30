import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

export const Encrypt: Prisma.Middleware = async (
  params: Prisma.MiddlewareParams,
  next
) => {
  if (
    (params.action === "create" || params.action === "update") &&
    params.model == "User"
  ) {
    let user = params.args.data;
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  return await next(params);
};
