export type CreateOrderData = {
  productIds: number[]
}

export type OrderItem = {
  id: number
  orderId: number
  productId: number | null
  name: string,
  server: string
  price: string
  quantity: number

  product?: {
    id: number
    name: string
    server: string
  } | null
}

export type Order = {
  id: number
  userId: number
  createdAt: string
  items: OrderItem[]
}