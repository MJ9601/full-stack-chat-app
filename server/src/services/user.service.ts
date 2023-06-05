import { Prisma } from "@prisma/client";
import prisma from "../database/prisma.config";
import bcrypt from "bcrypt";

export const createUser = async (input: Prisma.UserCreateArgs) =>
  prisma.user.create(input);

export const findOneUser = async (input: Prisma.UserFindUniqueArgs) =>
  prisma.user.findUnique(input);

export const findManyUsers = async (input: Prisma.UserFindManyArgs) =>
  prisma.user.findMany(input);

export const updateOneUsers = async (input: Prisma.UserUpdateArgs) =>
  prisma.user.update(input);

export const deleteManyUsers = async (input: Prisma.UserDeleteManyArgs) =>
  prisma.user.deleteMany(input);

export const deleteOneUsers = async (input: Prisma.UserDeleteArgs) =>
  prisma.user.delete(input);

export const validateUsernameAndPassword = async (
  username: string,
  incomingPass: string
) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return false;

  const compairedPass = await bcrypt.compareSync(incomingPass, user.password);
  return !compairedPass ? false : user;
};
