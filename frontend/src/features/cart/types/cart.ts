export type CartProduct = {
  id: number
  name: string
  price: string
  quantity: number
}

export type CartItem = {
  id: number
  cartId: number
  productId: number
  quantity: number
  product: CartProduct
}

export type Cart = {
  id: number
  userId: number
  items: CartItem[]
}