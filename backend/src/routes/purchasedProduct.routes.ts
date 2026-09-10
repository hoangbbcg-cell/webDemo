import { Router } from "express"
import { checkAuth } from "../middlewares/checkAuth"

import * as purchasedProductController
  from "../controllers/purchasedProduct.controller"

const router = Router()

router.get(
  "/",
  checkAuth,
  purchasedProductController.getPurchasedProductsController,
)

export default router