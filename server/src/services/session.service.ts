import bcrypt from "bcrypt";
import prisma from "../database/prisma.config";

export const validateUsernameAndPassword = async (
  username: string,
  incomingPass: string
) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return false;

  const compairedPass = await bcrypt.compareSync(incomingPass, user.passhash);
  return !compairedPass ? false : user;
};
