import { Router } from "express";
import { login, register } from "../controllers/user.controller";
import { refreshController ,logoutController} from "../controllers/user.controller";
import {getCsrfTokenController} from "../controllers/csrfToken.controller"

import {validate} from "../middlewares/validate"
import { loginSchema,refreshTokenSchema,registerSchema } from "../validations/auth.validation";

const router = Router();

router.post(
  "/login",
  validate(loginSchema, "body"),
  login
)

router.post(
  "/register",
  validate(registerSchema, "body"),
  register
)

router.post(
  "/logout",
  logoutController
)

router.post(
  "/refresh-token",
  validate(refreshTokenSchema, "body"),
  refreshController
)

router.get(
  "/csrf-token",
  getCsrfTokenController
)

export default router;
