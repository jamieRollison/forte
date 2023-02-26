import React from "react"
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { AiOutlineUser } from "react-icons/ai"
import ForteLogo from "../assets/forte-logo.png"
import { Link } from "react-router-dom"
import { AddFriendsModal } from "./AddFriendsModal.jsx"
import { useState } from "react"

const NavBar = ({ userId, showIcons }) => {
  const [modalFriendsVisible, setModalFriendsVisible] = useState(false)
  return (
    <nav className="bg-black text-white flex justify-center py-5">
      <div className="flex items-center justify-end gap-10">
        <AddFriendsModal
          modalFriendsVisible={modalFriendsVisible}
          setModalFriendsVisible={setModalFriendsVisible}
        />
        {showIcons && (
          <AiOutlineUsergroupAdd
            size={30}
            onClick={() => setModalFriendsVisible(true)}
          />
        )}
        <Link to="/feed">
          <img src={ForteLogo}></img>
        </Link>
        {showIcons && (
          <Link to="/profile" state={{ userId: userId }}>
            <AiOutlineUser size={30} />
          </Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar
