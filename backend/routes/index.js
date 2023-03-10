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

// Get user
router.get("/posts/:userId", async (req, res) => {
  const { userId } = req.params

  const userData = await User.findById(ObjectId(userId))
  const friends = userData.friends.concat(userId).map((id) => ObjectId(id))

  var start = new Date()
  start.setHours(0, 0, 0, 0)

  var end = new Date()
  end.setHours(23, 59, 59, 999)
  // {dateCreated: {$gte: start, $lt: end}}
  // {$and: [
  await Post.find({ userId: { $in: friends } }).then((response) => {
    res.status(200).send(response)
  })
})

// Post a song to the database
router.post("/songs", async (req, res) => {
  const song = req.body

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

// post a post to the database
router.post("/posts", async (req, res) => {
  const post = req.body

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

router.get("/username/:usernameQuery", async (req, res) => {
  const { usernameQuery } = req.params

  const user = await User.findOne({ username: usernameQuery }).exec()

  res.status(200).send(user)
})

router.post("/friends/:userId/:friendId", async (req, res) => {
  const { userId, friendId } = req.params

  const response = await User.findByIdAndUpdate(userId, {
    $push: { friends: ObjectId(friendId) },
  })

  // Add a try-catch here later
  res.status(200).send("Added friend")
})

router.get("/friends/:userId", async (req, res) => {
  const { userId } = req.params

  const userData = await User.findById(ObjectId(userId))
  const userFriends = userData.friends

  res.status(200).send(userFriends)
})

module.exports = router
