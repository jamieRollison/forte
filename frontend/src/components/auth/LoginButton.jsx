import { useAuth0 } from "@auth0/auth0-react"
import { Navigate } from "react-router-dom"
import { Circles } from "react-loader-spinner"

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()
  if (isLoading) {
    return (
      <div style={{ marginTop: "10%", paddingBottom: "5%", paddingTop: "5%" }}>
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
          <div className="mt-10 text-xl">
            <p className="text-white">Loading</p>
          </div>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/feed" replace={true} />
  }

  const onLogin = () => {
    loginWithRedirect()
  }

  return (
    <div className="pt-6">
      <button
        className="px-6 py-2 rounded-md font-galos border-2 text-white hover:bg-white hover:text-black border-white "
        onClick={onLogin}
      >
        Get Started
      </button>
    </div>
  )
}
export { LoginButton }
