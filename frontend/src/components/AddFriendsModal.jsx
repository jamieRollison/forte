import ReactModal from "react-modal"
import { BsPeopleFill } from "react-icons/bs"

const AddFriendsModal = ({ modalFriendsVisible, setModalFriendsVisible }) => {
  const bg = {
    overlay: {
      background: "rgba(0, 0, 0, 0.40)",
    },
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
        />
        <button
          className="bg-amber-400 rounded-md w-8 h-8 font-galos text-white"
          onClick={() => setModalFriendsVisible(false)}
        >
          +
        </button>
      </div>
    </ReactModal>
  )
}

export { AddFriendsModal }
