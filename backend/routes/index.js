const { User, Post, Comment, Song } = require("../models")
const express = require("express")
const ObjectId = require("mongodb").ObjectId

const router = express.Router()

// Add user to database if they do not already have an account
router.post("/users", async (req, res) => {
  const user = req.body
  const { email } = user
  try {
    await User.findOneAndUpdate({ email: email }, user, {
      upsert: true,
      new: true,
    }).then((response) => {
      res.status(200).send(response)
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
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
router.get("/users/username/:username", async (req, res) => {
  const { usernameQuery } = req.params

  const response = await User.findOne({ username: usernameQuery })

  console.log(response)

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
  const { userId, friendId } = req.body

  const response = await User.findByIdAndUpdate(userId, {
    $push: { friends: ObjectId(friendId) },
  })

  console.log(response)

  res.status(200).send("Added like")
})

// Get user
router.get("/posts/:userId", async (req, res) => {
  const { userId } = req.params

  const userData = await User.findById(ObjectId(userId))
  const friends = userData.friends.concat(userId).map((id) => ObjectId(id))

  console.log("friends", friends)

  var start = new Date()
  start.setHours(0, 0, 0, 0)

  var end = new Date()
  end.setHours(23, 59, 59, 999)
  // {dateCreated: {$gte: start, $lt: end}}
  // {$and: [
  await Post.find({ userId: { $in: friends } }).then((response) => {
    console.log("posts:", response)
    res.status(200).send(response)
  })
})

// Post a song to the database
router.post("/songs", async (req, res) => {
  const song = req.body
  console.log("song in router", song)
  try {
    await Song.findOneAndUpdate(
      song,
      { $setOnInsert: { song } },
      { new: true, upsert: true }
    ).then((response) => {
      res.status(200).send(response)
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

// Post a post to the database
router.post("/posts", async (req, res) => {
  const post = req.body
  console.log("post in router", post)
  try {
    await Post.create(post).then((response) => res.status(200).send(response))
  } catch {
    ;(err) => res.status(500).send(err)
  }
})

router.get("/posts/user/:userId", async (req, res) => {
  const { userId } = req.params

  try {
    await Post.find({ userId: userId }).then((response) =>
      res.status(200).send(response)
    )
  } catch {
    ;(err) => res.status(500).send(err)
  }
})

// get a song from the database
router.get("/songs/:songId", async (req, res) => {
  const { songId } = req.params
  try {
    await Song.findById(songId).then((response) => res.status(200).send(response))
  } catch {
    ;(err) => res.status(500).send(err)
  }
})

module.exports = router
