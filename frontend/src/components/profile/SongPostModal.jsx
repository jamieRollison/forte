import ReactModal from "react-modal"
import React from "react";
import Vinyl from '../../assets/vinyl.PNG'
import { BsSpotify } from "react-icons/bs";
import MyPFP from '../../assets/ellie.JPG'

const SongPostModal = ({isModalVisible, setIsModalVisible, spotifyCover, spotifyLink, artist, song, time, userDescription, username}) => {
    return (
      <ReactModal
        isOpen={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        className="w-80 h-1/6 mt-40 bg-black mx-auto rounded-xl"
      >
          <div className="mb-10 flex flex-col md:mx-60">

  <div className="flex justify-between mx-10 mb-4">
    <div className="mt-10 flex items-center">
      <div className="overflow-hidden object-cover">
        <div className="w-10 h-10 relative overflow-hidden border-sm">
        <img className="inline my-auto h-full w-auto rounded-full" src={MyPFP}></img>
        </div>
      </div>
      <p className="text-gray-400 ml-2 font-galos font-bold text-lg"> {username} </p>
    </div>
    <div className="text-gray-400 mt-10 flex items-center font-galos text-lg">
      {time}
    </div>
  </div>
 

  <div className="relative mx-12 rounded-lg" style={{
    backgroundImage: `url(${spotifyCover}), linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)) `,
    backgroundSize: 'cover',

  }}>
   <div className="mt-6 rounded-md max-w-md mx-10 z-1 sm:mx-auto height-wrap animate-spin-slow">
      <div className="flex mx-10 flex-col justify-center items-center ">
      <img className="absolute mx-auto top-28 z-2 width-wrap" src={spotifyCover}></img>
      <img className="absolute mx-auto max-w-sm z-3 top-0"src={Vinyl}></img>
      </div>
   </div>
  </div>
  <div className="flex justify-between items-center my-4 mx-12">
    <div className="">
  <h1 className="text-white text-2xl font-galos font-bold">
      {song}
   </h1>
   <p className="text-gray-400">
      By {artist}
   </p>
   </div>
   
    <button className="bg-green-600 hover:bg-green-800 rounded p-1  text-white" onClick={spotifyLink}>
      <div className="flex items-center mx-3 font-galos font-bold">Play on
    <BsSpotify className="text-white text-xl ml-2" />
    </div>
      </button>
   
   </div>
  <div className="flex mx-12 my-2">
    <p className="text-gray-200 font-galos text-md">
      {userDescription}
    </p>
  </div>
  
   </div>
      </ReactModal>
    )

}

export {SongPostModal}