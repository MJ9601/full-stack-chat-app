import prisma from "../database/prisma.config";
import { Prisma } from "@prisma/client";

export const createRoom = async (input: Prisma.RoomCreateArgs) =>
  await prisma.room.create(input);

export const findOneRoomById = async (input: Prisma.RoomFindUniqueArgs) =>
  await prisma.room.findUnique(input);

export const findRooms = async (input: Prisma.RoomFindManyArgs) =>
  await prisma.room.findMany(input);

export const findOneRoomByName = async (input: Prisma.RoomFindFirstArgs) =>
  await prisma.room.findFirst(input);

export const updateOneRoom = async (input: Prisma.RoomUpdateArgs) =>
  await prisma.room.update(input);

export const removeOneRoom = async (input: Prisma.RoomDeleteArgs) =>
  await prisma.room.delete(input);

export const removeRooms = async (input: Prisma.RoomDeleteManyArgs) =>
  await prisma.room.deleteMany(input);
