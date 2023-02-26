import React, { useRef, useState, useEffect } from "react"
import Vinyl from "../../assets/vinyl.PNG"
import { BsSpotify } from "react-icons/bs"
import MyPFP from "../../assets/ellie.JPG"
import { getLikes } from "../../api/api"
import { CommentSection } from "../../pages/CommentSection"

// TODO: Get song info from postId
const MusicPost = ({
  spotifyCover,
  spotifyLink,
  artist,
  song,
  time,
  userDescription,
}) => {
  const [url, setUrl] = useState(spotifyCover)
  const [likes, setLikes] = useState([])
  const [likeCount, setLikeCount] = useState([])
  const postId = "63fb40a79c13727e0178c2a1"

  // Get likes in case we want usernames in the future
  useEffect(() => {
    getLikes(postId).then((likeIds) => setLikes(likeIds))
    console.log("likes: ", likes)
    console.log("postId: ", postId)
    setLikeCount(likes.length)
  }, [])

  return (
    <>
      <div className="mb-10">
        <div className="flex justify-between mx-10">
          <div className="mt-10 flex items-center">
            <div className="w-30 h-30 overflow-hidden object-cover">
              <div className="w-10 h-10 relative overflow-hidden border-sm">
                <img
                  className="inline mx-0 my-auto h-full w-auto rounded-full"
                  src={MyPFP}
                ></img>
              </div>
            </div>
            <p className="text-gray-400 ml-2"> exrlla </p>
          </div>
          <div className="text-gray-400 mt-10 flex items-center">{time}</div>
        </div>
        <div className="flex mx-12 mt-2">
          <p className="text-gray-500">{userDescription}</p>
        </div>

        <div
          className="relative mx-10 rounded-lg linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))"
          style={{
            backgroundImage: `url(${spotifyCover})`,
            backgroundSize: "cover",
          }}
        >
          <div className="mt-6 rounded-md max-w-md mx-10 z-1 sm:mx-auto height-wrap animate-spin-slow">
            <div className="flex mx-10 flex-col justify-center items-center">
              <img
                className="absolute mx-auto top-28 z-2 width-wrap"
                src={spotifyCover}
              ></img>
              <img
                className="absolute mx-auto max-w-sm w-auto z-3 top-0"
                src={Vinyl}
              ></img>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center mt-4">
          <h1 className="text-white text-2xl">{song}</h1>
          <p className="text-gray-400">By {artist}</p>

          <button
            className="bg-green-600 rounded p-1 m-2 text-white"
            onClick={spotifyLink}
          >
            <div className="flex items-center mx-4">
              Play on
              <BsSpotify className="text-white text-2xl ml-2" />
            </div>
          </button>
        </div>
        <CommentSection postId={postId} />
      </div>
    </>
  )
}

export default MusicPost
