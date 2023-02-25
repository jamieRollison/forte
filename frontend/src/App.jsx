import NavBar from './components/NavBar.jsx'
import Post from './components/Post.jsx'
import './App.css'
import './assets/ringift.ttf'
// import reactLogo from './assets/react.svg'

function App() {

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

export default App
