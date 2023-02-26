import { useEffect, useState } from "react"
import { getUser, getComment } from "../api/api"

const Comment = ({ commentId }) => {
  const [username, setUsername] = useState()
  const [picture, setPicture] = useState()
  const [commentContent, setCommentContent] = useState()

  useEffect(() => {
    getComment(commentId).then((comment) => {
      setCommentContent(comment.content)

      getUser(comment.commenterId.toString()).then((userData) => {
        setUsername(userData.username)
        setPicture(userData.picture)
      })
    })
  }, [])

  return (
    <div className="h-1/6 w-full flex border-t-2 border-gray-800 p-2">
      <div className="w-6 h-6 relative overflow-hidden border-sm">
        <img
          className="inline mx-0 my-auto h-full w-auto rounded-full"
          src={picture}
        />
      </div>
      <div className="ml-3 flex text-sm">
        <p className="text-white "> {commentContent} </p>
      </div>
    </div>
  )
}

export { Comment }
