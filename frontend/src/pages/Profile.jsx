import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getUser, getUserPosts, getSong } from "../api/api"
import NavBar from "../components/NavBar"
import { EditProfileModal } from "../components/profile/EditProfileModal"
import { PostPreviewCard } from "../components/profile/PostPreviewCard"

const Profile = () => {
    const [posts, setPosts] = useState(); 
    const location = useLocation();
    const { userId } = location.state;
    const [user, setUser] = useState({});
    const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);
    const [isCardModalVisible, setIsCardModalVisible] = useState(false);

    const convertDate = (dateString) => {
      console.log(dateString)
      const date = new Date(dateString);
      console.log( date.toLocaleDateString())
      return date.toLocaleDateString();
    }

  useEffect(() => {
    // console.log("HIIII")
    const getUserInfo = async () => {
      const res = await getUser(userId)
      setUser(res)
    }
    // console.log()
    // console.log("HIIII2")
    getUserInfo()
    const getPosts = async() => {
      const res2 = await getUserPosts(userId)
      const postsWithSongs = res2.map(async (element) => {
          const res3 = await getSong(element.song)
          console.log("REACHED HERE")
          return {...element, song: res3}
      })
      console.log("REACHED HERE2")
      const data = await Promise.all(postsWithSongs);
      console.log("THIS IS THE DATA");
      setPosts(data)
    }
    getPosts().then(response => {
      console.log(response);
  }).catch(e => {
      console.log(e);
  });
  }, [setUser, setPosts])

  return (
    <>
      <NavBar userId={userId} showIcons={false} />
      <EditProfileModal
        modalVisible={isEditProfileModalVisible}
        setModalVisible={setIsEditProfileModalVisible}
        user={user}
        setUser={setUser}
      />
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="border-sm flex-col"
      >
        <img
          style={{ height: "75px", width: "75px", marginBottom: "1%" }}
          className="inline mx-0 my-auto rounded-full"
          src={user.picture}
        ></img>
        <p className="text-white font-galos mt-2 text-xl">{`${user.firstName} ${user.lastName}`}</p>
        <p
          style={{ marginBottom: "3%" }}
          className="text-amber-400 font-galos mt-1 text-md underline "
        >
          @{user.username}
        </p>
        <button
          className="px-2 py-2 rounded-md border-2 font-galos border-white hover:bg-white hover:text-black text-white"
          onClick={() => setIsEditProfileModalVisible(true)}
        >
          Edit Profile
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "40px",
          height: "550px",
          overflow: "scroll",
        }}
      >
        {posts?.map((post, i) => (
          <PostPreviewCard
            key={i}
            date={convertDate(post.dateCreated)}
            img={post.song.imgUrl}
            isCardModalVisible={isCardModalVisible}
            setIsCardModalVisible={setIsCardModalVisible}
          />
        ))}

        
      </div>
    </>
  )
}
export { Profile }
