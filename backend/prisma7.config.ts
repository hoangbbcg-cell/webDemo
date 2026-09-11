import "dotenv/config"

import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    // Generating the client needs no database connection or runtime secrets.
    // Commands that access the database still require DATABASE_URL.
    url: process.env.DATABASE_URL,
  },
})
