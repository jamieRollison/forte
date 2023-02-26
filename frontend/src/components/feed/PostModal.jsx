import ReactModal from "react-modal"
import { AsyncTypeahead } from "react-bootstrap-typeahead"
import { useEffect, useState } from "react"
import { songSearch } from "../../api/api.js"
import { SearchResult } from "./SearchResult"

const PostModal = ({ modalVisible, setModalVisible }) => {
  const SEARCH_URI = "https://api.github.com/search/users"
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState([])

  const handleSearch = async (query) => {
    setIsLoading(true)

    setOptions(await songSearch(query))
    setIsLoading(false)
  }

  useEffect(() => {
    console.log(options)
  }, [options])

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true
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

        <AsyncTypeahead
          id="async-example"
          filterBy={filterBy}
          isLoading={isLoading}
          labelKey="name"
          minLength={3}
          onSearch={handleSearch}
          options={options}
          placeholder="Search Spotify..."
          className="px-2 h-8 rounded my-4 mx-10 last:border-y-white last:border-y-2"
          renderMenuItemChildren={(option) => {
            console.log(option)
            return (
              <>
                <SearchResult {...option} />
              </>
            )
          }}
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

export { PostModal }
