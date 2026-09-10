export type LoginResponse = {
  message: string
  user: {
    id: number
    name: string
    email: string
  }
  accessToken:string
  refreshToken: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type RegisterResponse = {
  message: string
  user: {
    id: number
    name: string
    email: string
  }
}
