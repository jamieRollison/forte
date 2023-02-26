import { LoginButton } from "../components/auth/LoginButton"
import { LogoutButton } from "../components/auth/LogoutButton"
import ForteLogo from "../assets/forte-logo.png"
import { FiMusic } from "react-icons/fi"

const Home = () => {
  return (
    <div>
      <nav className="bg-black text-white flex justify-center py-5">
        <div className="flex items-center justify-center gap-10">
          <img src={ForteLogo}></img>
        </div>
      </nav>
      <div className="flex flex-col items-center mx-10">
        <FiMusic size={100} className="text-white my-10" />
        <h1 className="font-galos font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 text-3xl text-center">
          Changing the way you share Music
        </h1>
        <LoginButton />
      </div>
    </div>
  )
}

export { Home }
