import React from "react"
import { useState, useEffect } from "react"
import { getComments } from "../api/api"
import { Comment } from "./Comment"

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(postId).then((postComments) => {
      setComments(postComments)
    })
  }, [])

  return (
    <div className="flex flex-col mx-10">
      {comments.length !== 0 &&
        comments.map((commentId) => {
          return <Comment key={commentId} commentId={commentId} />
        })}
    </div>
  )
}

export { CommentSection }
