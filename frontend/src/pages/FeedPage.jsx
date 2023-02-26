
import NavBar from '../components/NavBar.jsx'
import Post from '../components/Post.jsx'
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { findOrCreateUser } from '../../api/api.js';


const FeedPage = () => {
    const { user, isLoading } = useAuth0();
    console.log(user)
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("user", JSON.stringify(user));
            const makeUser = async () => {
                await findOrCreateUser({
                    username: user.nickname,
                    firstName: user.given_name,
                    lastName: user.family_name,
                    picture: user.picture,
                    email: `${user.nickname}@gmail.com`
                })
            }
            makeUser();
        }
      }, [isLoading]);

    return (
        <>
            <NavBar />
            <div className='flex justify-center'>
                <button className='mx-10 bg-blue-200 p-2 flex-1 md:w-10 rounded-md'>
                Add Today's Song
                </button>
            </div>
            <Post />
        </>
    )
}

export { FeedPage };