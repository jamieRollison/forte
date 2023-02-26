import ReactModal from "react-modal"
import { AsyncTypeahead } from "react-bootstrap-typeahead"
import { SearchResult } from "./SearchResult"
import { useEffect, useState } from "react"
import { songSearch } from "../../api/api"
import { postPost } from "../../api/api"

const PostModal = ({ modalVisible, setModalVisible }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState({})
  const [description, setDescription] = useState("");

  const handleSearch = async (query) => {
    setIsLoading(true)

    setOptions(await songSearch(query))
    setIsLoading(false)
  }

  const postSong = async () => {
    const song = {
      songName: selected.name,
      artist: selected.artists[0].name,
      imgUrl: selected.album.images[0].url,
      url: selected.external_urls.spotify,
    }
    const newPost = {
      song: song,
      description: description,
      dateCreated: new Date(),
      comments: [],
      reactions: [],
      userId: localStorage.getItem("userId"),
    }
    await postPost(newPost)
    setModalVisible(false)
  }

  return (
    <ReactModal
      isOpen={modalVisible}
      appElement={document.getElementById("root")}
      onRequestClose={() => setModalVisible(false)}
      className="w-80 h-auto mt-40 bg-black mx-auto rounded-xl"
    >
      <div className="flex flex-col justify-between items-center">
        <p className="text-white text-xl text-center pt-3 font-galos px-10">
          What are you listening to today?
        </p>
        <AsyncTypeahead
          id="async-search"
          filterBy={() => true}
          isLoading={isLoading}
          labelKey="name"
          minLength={3}
          onSearch={handleSearch}
          onChange={(selected) => setSelected({...selected[0]})}
          options={options}
          placeholder="Search Spotify..."
          className="px-2 w-60 h-8 rounded my-4 mx-10 font-galos focus:outline-none focus:ring-1 focus:ring-blue-600"
          renderMenuItemChildren={(option) => {
            return (
              <>
                <SearchResult {...option}/>
              </>
            )
          }}
        />
        {Object.keys(selected).length !== 0 && (
          <>
          <div className="flex flex-col items-center">
            <p className="text-white">Add a description to your post</p>
            <textarea
              className="w-60 h-20 rounded my-4 mx-10 font-galos focus:outline-none focus:ring-1 focus:ring-blue-600 resize-none"
              onChange={(e) => setDescription(e.target.value)}
            />
            
            </div>
            <button
            className="bg-amber-400 p-2 mb-5 rounded-md w-1/2 font-galos text-white"
            onClick={postSong}
          >
            Add Song
          </button>
          </>
        )}
      </div>
    </ReactModal>
  )
}

export { PostModal }
