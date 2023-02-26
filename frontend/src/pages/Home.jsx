import { LoginButton } from "../components/auth/LoginButton"
import { LogoutButton } from "../components/auth/LogoutButton"
import ForteLogo from "../assets/forte-logo.png"

const Home = () => {
  console.log(localStorage)
  return (
    <div>
      <nav className="bg-black text-white flex justify-center py-5">
        <div className="flex items-center justify-center gap-10">
          <img src={ForteLogo}></img>
        </div>
      </nav>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LoginButton />
      </div>
    </div>
  )
}

export { Home }
