import NavBar from "./components/NavBar.jsx"
import Post from "./components/Post.jsx"
import { useState } from "react"
import ReactModal from "react-modal"
import "./App.css"
import "./assets/ringift.ttf"

function App() {
  const [modalVisible, setModalVisible] = useState(false)

  const PostModal = () => {
    return (
      <ReactModal
        isOpen={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        className="w-80 h-40 mt-40 bg-black mx-auto rounded-xl"
      >
        <div className="flex flex-col justify-between items-center">
          <p className="text-white text-xl text-center pt-3">
            What are you listening to today?
          </p>
          <input
            placeholder="search spotify"
            className="px-2 w-60 h-8 rounded my-4 mx-10"
          />
          <button
            className="bg-blue-200 p-2 rounded-md w-1/2"
            onClick={() => setModalVisible(false)}
          >
            Add Song
          </button>
        </div>
      </ReactModal>
    )
  }

  return (
    <>
      <NavBar />
      <PostModal />
      <div className="flex justify-center">
        <button
          className="mx-10 bg-blue-200 p-2 flex-1 md:w-10 rounded-md"
          onClick={() => setModalVisible(true)}
        >
          Add Today's Song
        </button>
      </div>
      <Post />
    </>
  )
}

export default App;
