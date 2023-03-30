import { Prisma } from "@prisma/client";
import prisma from "../database/prisma.config";

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
