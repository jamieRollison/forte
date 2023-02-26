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
    <div className="h-1/6 w-full">
      <div className="w-10 h-10 relative overflow-hidden border-sm">
        <img
          className="inline mx-0 my-auto h-full w-auto rounded-full"
          src={picture}
        ></img>
      </div>
      <p className="text-white">
        <b>{username}</b>
        {commentContent}
      </p>
    </div>
  )
}

export { Comment }
