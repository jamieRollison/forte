const { User, Post, Comment } = require("../models")
const express = require("express")
const ObjectId = require("mongodb").ObjectId

const router = express.Router()

// Add user to database if they do not already have an account
router.post("/users", async (req, res) => {
  const user = req.body
  const { username } = user

  const response = await User.findOneAndUpdate({ username: username }, user, {
    upsert: true,
    new: true,
  })

  res.status(200).send(response)
})

// Get post likes
router.get("/likes/:postId", async (req, res) => {
  const { postId } = req.params

  const postData = await Post.findById(ObjectId(postId))
  const postLikes = postData.reactions

  res.status(200).send(postLikes)
})

// Add like
router.post("/likes/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params

  const response = await Post.findByIdAndUpdate(postId, {
    $push: { reactions: ObjectId(userId) },
  })

  // Add a try-catch here later
  res.status(200).send("Added like")
})

// Remove like
router.delete("/likes/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params

  const response = await Post.findByIdAndUpdate(postId, {
    $pull: { reactions: ObjectId(userId) },
  })

  res.status(200).send("Removed like")
})

// Get comments for a post
router.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params

  const postData = await Post.findById(ObjectId(postId))
  const postComments = postData?.comments

  res.status(200).send(postComments)
})

// Get user
router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params

  const userData = await User.findById(ObjectId(userId))

  res.status(200).send(userData)
})

// Get comment
router.get("/comments/comment/:commentId", async (req, res) => {
  const { commentId } = req.params

  const commentData = await Comment.findById(ObjectId(commentId))

  res.status(200).send(commentData)
})

// Update user username
router.put("/users/:id/:username", async (req, res) => {
  const { id, username } = req.params

  const doesUserExist = await User.exists({ username: username })

  if (doesUserExist) {
    res.status(404).send({})
    return
  }

  const response = await User.findByIdAndUpdate(ObjectId(id), {
    $set: { username: username },
  })
  res.status(200).send(response)
})

// Finds all usernames starting with the input
router.get("/users?user=query", async (req, res) => {
  const { query } = req.params
  const formattedSearch = `/^${query}/`

  const response = await User.find({ username: formattedSearch })

  res.status(200).send(response)
})

// Find user with the username
router.get("/users?username=query", async (req, res) => {
  const { query } = req.params
  const formattedSearch = `/${query}/`

  const response = await User.findOne({ username: formattedSearch })

  res.status(200).send(response)
})

// Get friends
router.get("/users/friends/:userId", async (req, res) => {
  const { userId } = req.params

  const friendData = await User.findById(ObjectId(userId)).friends

  res.status(200).send(friendData)
})

// Add friends
router.post("/friends", async (req, res) => {
  const { userId, friendId } = req.params

  const response = await User.findByIdAndUpdate(userId, {
    $push: { friends: ObjectId(friendId) },
  })

  res.status(200).send("Added like")
})

module.exports = router
