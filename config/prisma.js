// This file creates and exports a single, reusable Prisma Client instance
import { PrismaClient } from "../generated/prisma/client.ts";

const prisma = new PrismaClient();

export default prisma;
