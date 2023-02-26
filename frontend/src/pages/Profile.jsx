import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { getUser } from '../api/api';
import NavBar from '../components/NavBar';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { PostPreviewCard } from '../components/profile/PostPreviewCard';

const Profile = () => {
    const profiles = [1,2,3,4,5,45,45,45, 6, 7, 8]
    const location = useLocation();
    const { userId } = location.state;
    const [user, setUser] = useState({});
    const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);
    const [isCardModalVisible, setIsCardModalVisible] = useState(false);

    useEffect(() => {
            const getUserInfo = async () => {
                const res = await getUser(userId)
                setUser(res)
            }
            getUserInfo();
      }, [setUser]);

    return (
        <>
        <NavBar userId={userId} showIcons={false}/>
        <EditProfileModal modalVisible={isEditProfileModalVisible} setModalVisible={setIsEditProfileModalVisible} user={user} setUser={setUser}/>
         <div style={{display: "flex", alignItems: "center"}} className="border-sm flex-col">
            <img style={{height: "75px", width: "75px", marginBottom: "1%"}} className="inline mx-0 my-auto rounded-full" src={user.picture}></img>
            <p className="text-white font-galos mt-2 text-xl">{`${user.firstName} ${user.lastName}`}</p>
            <p style={{marginBottom:"3%"}} className="text-amber-400 font-galos mt-1 text-md underline ">@{user.username}</p>
            <button className="px-2 py-2 rounded-md border-2 font-galos border-white hover:bg-white hover:text-black text-white"
            onClick={() => setIsEditProfileModalVisible(true)}
            >Edit Profile</button>
        </div>
        <div style={{display:"flex", flexWrap: "wrap", justifyContent:"center", marginTop:"20px", overflow:"scroll", height: "200px", overflow:"scroll"}}>
            {profiles.map((profile, i) => (
                <PostPreviewCard key={i} date={profile} img={"https://react.semantic-ui.com/images/avatar/large/matthew.png"} isCardModalVisible={isCardModalVisible} setIsCardModalVisible={setIsCardModalVisible}/>
            ))}
        </div>
        </>
    );
}
export { Profile }