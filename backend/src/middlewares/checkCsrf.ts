import type {
  Request,
  Response,
  NextFunction,
} from "express"

export const checkCsrf = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookieToken =
    req.cookies.csrfToken

  const headerToken =
    req.headers["x-csrf-token"]

  if (
    !cookieToken ||
    !headerToken ||
    cookieToken !== headerToken
  ) {
    return res.status(403).json({
      message: "Invalid CSRF token",
    })
  }

  next()
}