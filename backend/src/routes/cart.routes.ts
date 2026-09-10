// cart.routes.ts

import { Router } from "express"
import { getCartController,addToCartController } from "../controllers/cart.controller"

import { checkAuth } from "../middlewares/checkAuth"

const router = Router()

router.get("/",checkAuth, getCartController)
router.post("/item",checkAuth,addToCartController)

export default router