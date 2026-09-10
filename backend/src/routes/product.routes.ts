import { Router } from "express";
import { checkRole } from "../middlewares/checkAuth";
import { Role } from "../../generated/prisma/client";

import { validate } from "../middlewares/validate";
import {
  createProductSchema,
  productIdParamsSchema,
} from "../validations/product.validation";

import * as productController from "../controllers/product.controller";

const router = Router();

router.get("/", productController.getProductsController);

router.post(
  "/",
  validate(createProductSchema, "body"),
  productController.createProduct,
);

router.get(
  "/:id",
  validate(productIdParamsSchema, "params"),
  productController.getProductById,
);

router.delete(
  "/:id",
  checkRole(Role.ADMIN),
  validate(productIdParamsSchema, "params"),
  productController.deleteProductController,
);

export default router;
