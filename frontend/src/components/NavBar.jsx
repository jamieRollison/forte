import React from "react"
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { AiOutlineUser } from "react-icons/ai"
import ForteLogo from "../assets/forte-logo.png"

function NavBar() {
  return (
    <nav className="bg-black text-white flex justify-center py-5">
      <div className="flex items-center justify-end gap-10">
        <AiOutlineUsergroupAdd size={30} />
        <img src={ForteLogo}></img>
        <AiOutlineUser size={30} />
      </div>
    </nav>
  )
}

export default NavBar
