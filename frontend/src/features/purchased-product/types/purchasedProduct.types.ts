// purchasedProduct.types.ts

export type PurchasedProduct = {
  id: number
  userId: number | null
  productId: number | null
  name: string
  server: string
  price: string
  account: string
  password: string
  createdAt: string
}