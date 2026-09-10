import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { logoutApi } from "../api/auth.api"

export const useLogout = () => {
  const navigate = useNavigate()


  return useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      navigate("/login")
    },
  })
}