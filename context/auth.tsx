import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import * as jose from "jose"
import { CLIENT_ID } from "../lib/auth"

type TUser = {
  id: number
  email: string
  username: string
}

type TAuthContext = {
  currentUser?: TUser
  loaded?: boolean
  setCurrentUser: (user: any) => void
}

const AuthContext = React.createContext<TAuthContext>({
  setCurrentUser: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<TUser>()
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    try {
      // @ts-ignore
      window?.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (res) => {
          if (!res.credential) {
            return
          }
          const { credential } = res
          console.log(credential)
          const payload = jose.decodeJwt(credential)
          const { email, name } = payload
          console.log(payload)
          setCurrentUser({
            username: name,
            email,
          } as TUser)
          router.push(
            {
              pathname: "/",
              query: {
                hint: `Welcome back, ${name}`,
                type: "success",
              },
            },
            "/"
          )
        },
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "") || {}
      if (user) {
        setCurrentUser({
          username: user.username,
          email: user.email,
          id: user.id,
        })
      }
    } catch (e) {
      console.error("Failed to parse user from local storage", e)
    }
    setLoaded(true)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        loaded,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
