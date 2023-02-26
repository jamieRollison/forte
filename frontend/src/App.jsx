import NavBar from './components/NavBar.jsx'
import MusicPost from './components/MusicPost.jsx'
import Taylor from './assets/midnights-sample.png'
import './App.css'
import './assets/ringift.ttf'
// import reactLogo from './assets/react.svg'

function App() {
  console.log(Taylor)
  return (
    <>
   <NavBar />
   <div className='flex justify-center'>
    <button className='mx-10 bg-blue-200 p-2 flex-1 md:w-10 rounded-md'>
      Add Today's Song
    </button>
  </div>
  <MusicPost 
  spotifyCover={Taylor}
  song={"Mastermind"}
  artist={"Taylor Swift"}
  time={"13:49"}
  userDescription={"Just listened to 'Mastermind' by Taylor Swift and it's a great addition to her discography. Catchy melody, clever lyrics, and well-produced with interesting electronic elements. Highly recommend giving it a listen!"}/>
  <MusicPost /> 
   </>
  )
}

export default App
