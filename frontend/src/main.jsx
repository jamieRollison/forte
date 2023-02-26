import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { Auth0Provider } from "@auth0/auth0-react"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-c67006qhfynkdaya.us.auth0.com"
      clientId="nAm4S6shh1oEHGA3ulPclTU1gnTLJ2Va"
      authorizationParams={{
        redirect_uri: `${window.location.origin}${"/feed"}`,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
