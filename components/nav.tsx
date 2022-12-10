import React, { useContext } from "react"
import { useRouter } from "next/router"
import { Menu } from "antd"
import AuthContext from "../context/auth"

const ROUTES = {
  home: "/",
  meetings: "/meetings/new",
  rooms: "/rooms",
  videos: "/videos",
  signIn: "/sign-in",
  signOut: "/sign-out",
}

const DEFAULT_ITEMS = [
  { key: "home", label: "Home" },
  { key: "meetings", label: "Meetings" },
  { key: "rooms", label: "Rooms" },
  { key: "videos", label: "Videos" },
]

const Nav = () => {
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)
  const sessionITem = currentUser?.username
    ? {
        key: "subMenu",
        label: currentUser.username,
        children: [{ key: "signOut", label: "Sign Out" }],
      }
    : { key: "signIn", label: "Sign In" }

  return (
    <>
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={({ key }) => router.push(ROUTES[key])}
        items={[...DEFAULT_ITEMS, sessionITem]}
      />
    </>
  )
}

export default Nav
