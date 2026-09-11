import crypto from "crypto"
import type { Request, Response } from "express"

export const getCsrfTokenController = (
  _req: Request,
  res: Response
) => {
  const csrfToken = crypto.randomBytes(32).toString("hex")

  res.cookie("csrfToken", csrfToken, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  })

  return res.status(200).json({
    csrfToken,
  })
}
