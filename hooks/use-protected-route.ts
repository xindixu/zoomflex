import { useLayoutEffect, useContext } from "react"
import { useRouter } from "next/router"

import AuthContext from "../context/auth"

const useProtectedRoute = () => {
  const { currentUser, loaded } = useContext(AuthContext)
  const router = useRouter()

  useLayoutEffect(() => {
    if (loaded && !currentUser) {
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
  }, [router, loaded, currentUser])

  return !currentUser
}

export default useProtectedRoute
