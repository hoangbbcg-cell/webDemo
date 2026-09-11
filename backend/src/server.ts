import "dotenv/config"

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import productRoutes from "./routes/product.routes"
import userRoutes from "./routes/user.routes"
import cartRoutes from "./routes/cart.routes"
import orderRoutes from "./routes/order.routes"
import purchasedProductRoutes from "./routes/purchasedProduct.routes"

import { errorHandler } from "./middlewares/errorHandler"

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
  })
)

app.use(express.json())
app.use(cookieParser())

app.get("/", (_req, res) => {
  res.json({
    message: "Backend is running",
  })
})

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/purchased-products", purchasedProductRoutes)

app.use(errorHandler)

const port = Number(process.env.PORT || 4000)

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`)
})
