
export type Product = {
    id: number,
    name: string,
    quantity: number,
    price: number,
    server: string
}

export type CreateProductInput = {
  name: string
  price: number
  server: string
  account: string
  password: string
}