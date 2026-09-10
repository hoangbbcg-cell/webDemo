import { z } from "zod";
import { validate } from "../middlewares/validate";
import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth";
import { checkCsrf } from "../middlewares/checkCsrf";

import * as orderController from "../controllers/order.controller";

const router = Router();

const createOrderSchema = z.object({
  productIds: z.array(z.number().int().positive()).min(1).max(100)
    .refine((ids) => new Set(ids).size === ids.length, "Không được chọn trùng nick"),
});
router.post("/", checkAuth, checkCsrf, validate(createOrderSchema, "body"), orderController.createOrderController);

router.get("/",checkAuth, orderController.getMyOrdersController);

export default router;
