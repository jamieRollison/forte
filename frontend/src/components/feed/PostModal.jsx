import ReactModal from "react-modal"
import { BsPeopleFill } from "react-icons/bs"


const PostModal = ({modalVisible, setModalVisible}) => {
  const bg = {
    
    overlay: {
        background: "rgba(0, 0, 0, 0.75)"
    }
}
    return (
      <ReactModal
        isOpen={modalVisible}
        style={bg}
        onRequestClose={() => setModalVisible(false)}
        className="w-96 h-1/4 pt-6 bg-gray-900 mx-auto rounded-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center"
      >
        <div className="flex flex-col justify-between items-center">
          <p className="text-white text-xl text-center pt-3 font-galos px-10">
            What are you listening to today?
          </p>
          <input
            type="text"
            placeholder="Search Spotify"
            className="px-2 w-80 h-8 rounded my-4 mx-10 font-galos focus:outline-none focus:ring-1 focus:ring-blue-600"
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

export { PostModal }