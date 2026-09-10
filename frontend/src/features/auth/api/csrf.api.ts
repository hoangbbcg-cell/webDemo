import { apiClient,setCsrfToken } from "../../../lib/apiClient"

type CsrfResponse = {
  csrfToken: string
}

export const getCsrfTokenApi = async () => {
  const response =
    await apiClient.get<CsrfResponse>(
      "/api/users/csrf-token"
    )

    setCsrfToken(response.data.csrfToken)

  return response.data.csrfToken
} 