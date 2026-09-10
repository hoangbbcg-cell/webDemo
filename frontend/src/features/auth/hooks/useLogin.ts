import { useMutation } from "@tanstack/react-query"
import { loginApi } from "../api/auth.api"
import { useAuthStore } from "../stores/authStores"

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      setAuth(
        data.user,
        data.accessToken
      )
    },
  })
}
