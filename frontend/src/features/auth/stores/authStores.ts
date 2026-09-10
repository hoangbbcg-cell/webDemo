
import { create } from "zustand"
import { persist } from "zustand/middleware"

type AuthUser = {
  id: number
  name: string
  email: string
}

type AuthState = {
  user: AuthUser | null
  accessToken: string | null

  setAuth: (
    user: AuthUser,
    accessToken: string
  ) => void

  setAccessToken: (
    accessToken: string
  ) => void

  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setAuth: (user, accessToken) => {
        set({
          user,
          accessToken,
        })
      },

      setAccessToken: (accessToken) => {
        set({
          accessToken,
        })
      },

      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
        })
      },
    }),
    {
      name: "auth-storage",
    }
  )
)
