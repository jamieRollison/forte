export const SearchResult = ({ name, album, artists }) => {
const album_art = album.images[0].url
const artist = artists[0].name

return (
  <div className="bg-black border-x-solid">
    <div className="flex items-center space-x-4 ">
      <img className="w-10 h-10" src={album_art} alt="" />
      <div className="text-white">
        <h1 className="font-bold">{name}</h1>
        <p className="text-xs mb-1">{artist}</p>
      </div>
    </div>
  </div>
)
}