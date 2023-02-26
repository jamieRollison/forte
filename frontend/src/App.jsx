
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home"
import './assets/ringift.ttf'
import { FeedPage } from './pages/FeedPage';
import { Profile } from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="profile" element={<Profile/>}/>
          {/*<Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
