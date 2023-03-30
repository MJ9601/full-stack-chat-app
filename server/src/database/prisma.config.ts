import { PrismaClient } from "@prisma/client";
import * as middleware from "./prisma.middleware";

const prisma = new PrismaClient();

prisma.$use(middleware.Encrypt);

export default prisma;
