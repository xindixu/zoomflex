import React, { useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { signOut } from "../lib/auth"
import AuthContext from "../context/auth"

function SignOut() {
  const router = useRouter()
  // @ts-ignore
  const { setCurrentUser, isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn) {
    router.push(
      {
        pathname: "/",
        query: {
          hint: "You are not logged in",
          type: "warning",
        },
      },
      "/"
    )
  }

  useEffect(() => {
    signOut().then(async () => {
      setCurrentUser({})

      localStorage.removeItem("user")

      router.push(
        {
          pathname: "/",
          query: {
            hint: "You've logged out",
            type: "success",
          },
        },
        "/"
      )
    })
  }, [router, setCurrentUser])

  return <div>SignOut</div>
}

export default SignOut
