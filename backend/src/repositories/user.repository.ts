import { prisma } from "../lid/prisma"

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
}

export const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  })
}