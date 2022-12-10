import { useEffect, useContext } from "react"
import { useRouter } from "next/router"

import AuthContext from "../context/auth"

const useProtectedRoute = () => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push(
        {
          pathname: "/sign-in",
          query: {
            hint: "Please log in first",
            type: "warning",
          },
        },
        "/sign-in"
      )
    }
  }, [router, currentUser])

  return !currentUser
}

export default useProtectedRoute
