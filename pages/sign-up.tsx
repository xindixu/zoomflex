import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import Session from "../components/session"
import { SIGNUP } from "../components/session"
import AuthContext from "../context/auth"

function SignUp() {
  const router = useRouter()
  const { setCurrentUser } = useContext(AuthContext)

  const onSuccess = async (res) => {
    setCurrentUser(res)
    router.push(
      {
        pathname: "/",
        query: {
          hint: "Welcome!",
          type: "success",
        },
      },
      "/"
    )
  }
  return <Session type={SIGNUP} onSuccess={onSuccess} />
}

export default SignUp
