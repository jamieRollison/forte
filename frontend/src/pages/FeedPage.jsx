import NavBar from "../components/NavBar.jsx"
import MusicPost from "../components/feed/MusicPost.jsx"
import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { findOrCreateUser, getFeedPosts, getSong, getUser } from "../api/api"
import { PostModal } from "../components/feed/PostModal.jsx"
import { useState } from "react"
import Taylor from "../assets/midnights-sample.png"
import { FaPlus } from "react-icons/fa"
import { getAccessToken } from "../api/api"

const FeedPage = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [userId, setUserId] = useState("")
  const { user, isLoading } = useAuth0()
  const [postData, setPostData] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("user", JSON.stringify(user))
      const makeUser = async () => {
        const res = await findOrCreateUser({
          username: user.nickname,
          firstName: user.given_name,
          lastName: user.family_name,
          picture: user.picture,
          email: `${user.nickname}@gmail.com`,
        })
        setUserId(res._id)
        localStorage.setItem("userId", res._id)
      }
      makeUser()
    }
  }, [isLoading, setUserId])

  useEffect(() => {
    const createPosts = async () => {
    await Promise.all(postData.map(async (post, key) => {
      const d = new Date(post.dateCreated)
      const {artist, imgUrl, songName} = await getSong(post.song).then((res) => res)
      const { username, picture } = await getUser(post.userId).then((res) => res)
      return {
        userDescription: post.description,
        time: d.toLocaleTimeString(),
        artist: artist,
        imgUrl: imgUrl,
        songName: songName,
        username: username,
        picture: picture
      }
    })).then((res) => {setPosts(res)})}
    createPosts()
  }
  , [postData])

  const refreshAccessToken = async () => {
    await getAccessToken().then((token) => {
      localStorage.setItem("token", token)
    })
  }

  useEffect(() => {
    const generateFeed = async () => {
      await getFeedPosts(localStorage.getItem('userId')).then((res) => setPostData(res))
    }
    generateFeed()
  }, [getFeedPosts, setPostData, userId])

  useEffect(() => {
    refreshAccessToken()
  }, [])

  useEffect(() => {
    console.log(postData)
  }, [postData])

  setInterval(async () => {
    refreshAccessToken()
  }, 3600 * 1000)

  return (
    <>
      <NavBar userId={userId} showIcons={true} />
      <PostModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <div className="flex flex-col items-center">
        <div>
          <h1 className="text-gray-300 text-md font-galos text-center mx-10 mb-2">
            What are you listening to today? <br />
            Share with the world!
          </h1>
        </div>
        <button
          className="mx-10 bg-blue-800 text-white p-2 flex-1 md:w-60 rounded-md font-galos inline-flex items-center"
          onClick={() => setModalVisible(true)}
        >
          <FaPlus size={15} className="mr-2" />
          <span>Add Today's Song</span>
        </button>
      </div>
      {posts.map( (post, key) => {
        return(<MusicPost
          username={post.username}
          spotifyCover={post.imgUrl}
          userDescription={post.userDescription}
          artist={post.artist}
          song={post.songName}
          time={''}
          picture={post.picture}
        />)
      })}
      
      
    </>
  )
}

export { FeedPage }
