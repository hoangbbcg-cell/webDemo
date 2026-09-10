import crypto from "crypto"
import type { Request, Response } from "express"

export const getCsrfTokenController = (
  _req: Request,
  res: Response
) => {
  const csrfToken = crypto.randomBytes(32).toString("hex")

  res.cookie("csrfToken", csrfToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  })

  return res.status(200).json({
    csrfToken,
  })
}