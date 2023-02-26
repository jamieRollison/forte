
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home"
import './App.css'
import './assets/ringift.ttf'
import { FeedPage } from './pages/FeedPage';
import "./App.css"
import "./assets/ringift.ttf"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="feed" element={<FeedPage />} />
          {/*<Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
