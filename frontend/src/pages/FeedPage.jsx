
import NavBar from '../components/NavBar.jsx'
import MusicPost from '../components/feed/MusicPost.jsx'
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { findOrCreateUser } from '../api/api';
import { PostModal } from '../components/feed/PostModal.jsx';
import { useState } from "react";
import Taylor from '../assets/midnights-sample.png';

const FeedPage = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [userId, setUserId] = useState("");
    const { user, isLoading } = useAuth0();
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("user", JSON.stringify(user));
            const makeUser = async () => {
                const res = await findOrCreateUser({
                    username: user.nickname,
                    firstName: user.given_name,
                    lastName: user.family_name,
                    picture: user.picture,
                    email: `${user.nickname}@gmail.com`
                })
                setUserId(res._id)
            }
            makeUser();
        }
      }, [isLoading, setUserId]);

    return (
        <>
            <NavBar userId={userId} showIcons={true}/>
            <PostModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <div className="flex justify-center">
                <button
                className="mx-10 bg-blue-200 p-2 flex-1 md:w-10 rounded-md"
                onClick={() => setModalVisible(true)}
                >
                Add Today's Song
                </button>
            </div>
            <MusicPost
             spotifyCover={Taylor}
             userDescription={"Something about.. men. "}
             artist={"Taylor Swift"}
             song={"Midnight"}
             time={"13:48"}/>
        </>
    )
}

export { FeedPage };