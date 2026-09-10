import "dotenv/config"

import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "../../generated/prisma/client"

const adapter = new PrismaMariaDb({
  host: process.env.MYSQLHOST!,
  port: Number(process.env.MYSQLPORT!),
  user: process.env.MYSQLUSER!,
  password: process.env.MYSQLPASSWORD!,
  database: process.env.MYSQLDATABASE!,
})

export const prisma = new PrismaClient({
  adapter,
})