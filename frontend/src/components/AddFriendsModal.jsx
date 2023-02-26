import ReactModal from "react-modal"

const AddFriendsModal = ({ modalVisible, setModalVisible }) => {
  return (
    <ReactModal
      isOpen={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      className="w-80 h-1/5 mt-40 bg-black mx-auto rounded-xl"
    >
      <div className="flex flex-col justify-between items-center">
        <p className="text-white text-xl text-center pt-3 font-galos px-10">
          What are you listening to today?
        </p>
        <input
          type="text"
          placeholder="Search Spotify"
          className="px-2 w-60 h-8 rounded my-4 mx-10 font-galos focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
        <button
          className="bg-amber-400 p-2 rounded-md w-1/2 font-galos text-white"
          onClick={() => setModalVisible(false)}
        >
          Add Song
        </button>
      </div>
    </ReactModal>
  )
}

export { AddFriendsModal }
