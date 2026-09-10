import type { NextFunction, Request, Response } from "express"
import type { ZodType } from "zod"

type ValidateTarget = "body" | "params" | "query"

export const validate = (
  schema: ZodType,
  target: ValidateTarget
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(req[target])

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues,
      })
    }

    req[target] = result.data

    next()
  }
}