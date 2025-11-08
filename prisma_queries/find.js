import prisma from "../config/prisma.js";

export async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getUserInfoByUsername(username) {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  return user;
}

export async function getUserInfoByID(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
}
