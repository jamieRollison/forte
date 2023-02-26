import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getUser } from "../api/api"
import NavBar from "../components/NavBar"
import { EditProfileModal } from "../components/profile/EditProfileModal"

const Profile = () => {
  const location = useLocation()
  const { userId } = location.state
  const [user, setUser] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUser(userId)
      setUser(res)
    }
    getUserInfo()
  }, [setUser])

  return (
    <>
      <NavBar userId={userId} showIcons={false} />
      <EditProfileModal
        modalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        user={user}
        setUser={setUser}
      />
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="border-sm flex-col"
      >
        <img
          style={{ height: "125px", width: "125px", marginBottom: "1%" }}
          className="inline mx-0 my-auto rounded-full"
          src={user.picture}
        ></img>
        <p className="text-white font-galos mt-2 text-2xl">{`${user.firstName} ${user.lastName}`}</p>
        <p className="text-amber-400 font-galos mt-1 text-lg underline ">
          @{user.username}
        </p>
        <br></br>
        <button
          className="px-2 py-2 rounded-md border-2 font-galos border-white hover:bg-white hover:text-black text-white"
          onClick={() => setIsModalVisible(true)}
        >
          Edit Profile
        </button>
      </div>
    </>
  )
}
export { Profile }
