import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { Circles } from 'react-loader-spinner'



const LoginButton = () => {
    // console.log(JSON.parse(localStorage.getItem("user")))
    const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
    if (isLoading) {
        return (
        <div style={{marginTop: "10%", paddingBottom: "5%", paddingTop: "5%"}}>
            <div className="flex flex-col items-center">
                <Circles
                height="100"
                width="100"
                color="white"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
                <div className= "mt-10 text-xl">
                    <p className="text-white">Loading</p>
                </div>
            </div>
        </div>);
      }
    
      if (isAuthenticated) {
        return <Navigate to="/feed" replace={true} />;
      }

    const onLogin = () => {
        loginWithRedirect();
    }

  return <div style={{paddingTop:"20%"}}><button style={{padding: "10px 20px 10px 20px", borderRadius: "10px"}} className="bg-white" onClick={onLogin}>Log In</button></div>;
};
export {LoginButton};