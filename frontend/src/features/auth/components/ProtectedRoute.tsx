import { Navigate } from "react-router-dom"
import { useAuthStore } from "../stores/authStores"

type Props = {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  )

  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  return children
}