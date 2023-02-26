import { useState, useEffect } from "react";
import ReactModal from "react-modal"
import { updateUsername } from "../../api/api";


const EditProfileModal = ({modalVisible, setModalVisible, user, setUser}) => {
    const [username, setNewUserName] = useState("")
    const [isValidUsername, setIsValidUsername] = useState(true);

    useEffect(() => {
        setNewUserName(user.username)
      }, [user]);

    const onUpdate = async () => {
        const value = await updateUsername(user._id, username);
        setIsValidUsername(value)
        if (value) {
            setUser({...user, username: username})
            setModalVisible(false);
        }
    }
      
    return (
      <ReactModal
        isOpen={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        className="w-80 h-1/6 mt-40 bg-black mx-auto rounded-xl"
      >
        <div className="flex flex-col justify-between items-center">
          <input
            type="text"
            value={username}
            className="px-2 py-1 w-60 h-8 rounded mt-4 mx-10 font-galos focus:outline-none focus:ring-1 focus:ring-blue-600"
            onChange={event => {
                setIsValidUsername(true);
                setNewUserName(event.target.value)
            }}
          />
          <p style={{color: "red", visibility: isValidUsername ? "hidden" : "visible"}}>Username is not available</p>
          <button
            style={{marginTop:"3%"}}
            className="bg-amber-400 p-2.5 rounded-md w-1/2 font-galos text-white"
            onClick={() => onUpdate()}
          >
            Update username
          </button>
        </div>
      </ReactModal>
    )
  }

export { EditProfileModal }