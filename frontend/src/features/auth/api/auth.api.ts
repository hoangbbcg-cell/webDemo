import { apiClient } from "../../../lib/apiClient"

import type { LoginPayload,LoginResponse,RegisterPayload,RegisterResponse } from "../types/auth.types"

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    "/api/users/login",
    payload
  )

  return response.data
}

export const registerApi = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>(
    "/api/users/register",
    payload
  )

  return response.data
}

export const logoutApi = async () => {
  const response = await apiClient.post(
    "/api/users/logout"
  )

  return response.data
}