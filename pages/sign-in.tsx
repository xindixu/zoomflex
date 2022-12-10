import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import Session from "../components/session"
import { SIGNIN } from "../components/session"
import AuthContext from "../context/auth"

function SignIn() {
  const router = useRouter()
  // @ts-ignore
  const { currentUser, setCurrentUser } = useContext(AuthContext)

  useEffect(() => {
    if (currentUser) {
      router.push(
        {
          pathname: "/",
          query: {
            hint: "You've already logged in",
            type: "warning",
          },
        },
        "/"
      )
    }
  }, [])

  const onSuccess = async (res) => {
    setCurrentUser(res)
    localStorage.setItem("user", JSON.stringify(res))
    router.push(
      {
        pathname: "/",
        query: {
          hint: "Welcome back",
          type: "success",
        },
      },
      "/"
    )
  }

  return <Session type={SIGNIN} onSuccess={onSuccess} />
}

export default SignIn
