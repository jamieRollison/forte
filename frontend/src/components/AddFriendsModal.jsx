import ReactModal from "react-modal"
import { BsPeopleFill } from "react-icons/bs"
import { useState } from "react"
import { getFriends, getUserByUsername, addFriend } from "../api/api"

const AddFriendsModal = ({ modalFriendsVisible, setModalFriendsVisible }) => {
  const [input, setInput] = useState("")
  const [friendedState, setFriendedState] = useState("")
  const [isEditing, setIsEditing] = useState()
  const userId = "63faf3f926a6086035ac949d"

  const bg = {
    overlay: {
      background: "rgba(0, 0, 0, 0.40)",
    },
  }

  const handleClick = async () => {
    // This user is the friend
    const friend = await getUserByUsername(input)

    if (user) {
      const friendIds = await getFriends(userId)

      if (friendIds.find((friendId) => friendId === friend.userId)) {
        setFriendedState(`Already friended ${input}!`)
      } else {
        await addFriend(userId, friend.userId)
        setFriendedState(`Friended ${input}!`)
      }
    } else {
      setFriendedState(
        `Try again with another username. User ${input} does not exist!`
      )
    }

    setIsEditing(false)
  }

  const handleEditing = async (event) => {
    setInput(event.target.value)
    setIsEditing(true)
  }

  return (
    <ReactModal
      isOpen={modalFriendsVisible}
      style={bg}
      onRequestClose={() => setModalFriendsVisible(false)}
      className="w-96 h-1/3 items-center justify-center bg-gray-900 mx-auto rounded-xl flex flex-col absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex flex-col justify-between items-center">
        <BsPeopleFill size={50} className="text-white" />
        <p className="text-white text-xl text-center pt-3 font-galos px-10">
          Forte is more fun with friends.
          <p className="text-gray-300 text-sm">
            {" "}
            Add your friends to see what they're listening to!
          </p>
        </p>
      </div>
      <div className="flex h-8 items-center mt-10 gap-1">
        <input
          type="text"
          placeholder="Lookup username"
          className="pl-2 w-60 h-8 text-sm rounded my-4 font-galos focus:outline-none focus:ring-1 focus:ring-blue-600"
          onChange={(event) => handleEditing(event)}
        />
        <button
          className="bg-amber-400 rounded-md w-8 h-8 font-galos text-white"
          onClick={() => handleClick}
        >
          +
        </button>

        <p
          style={{
            color: "red",
            visibility: isEditing ? "hidden" : "visible",
          }}
        >
          {friendedState}
        </p>
      </div>
    </ReactModal>
  )
}

export { AddFriendsModal }
