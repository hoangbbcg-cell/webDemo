import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("ERROR:", error)
  console.log("IS APP ERROR:", error instanceof AppError)

  if (error instanceof AppError) {
    return res.status(error.status).json({
      code: error.code,
      message: error.message
    })
  }

  return res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error"
  })
}
