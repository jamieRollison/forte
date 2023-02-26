const { User } = require('../models')
const express = require("express");
const { Post } = require("../models");
const ObjectId = require("mongodb").ObjectId;

const router = express.Router()

router.post('/users', async (req, res) => {
  const user = req.body;
  const {username} = user;
  const response = await User.findOneAndUpdate({username: username}, user, {upsert: true, new: true})
  res.status(200).send(response);
})

module.exports = router;
// Get post likes
router.get("/likes/:postId", async (req, res) => {
  const { postId } = req.params;

  const postData = await Post.findById(ObjectId(postId));
  const postLikes = postData.reactions;
  res.status(200).send(postLikes);
});

// Add like
router.post("/likes/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params;

  const response = await Post.findByIdAndUpdate(postId, {
    $push: { reactions: ObjectId(userId) },
  });

  // Add a try-catch here later
  res.status(200).send("Added like");
});

// Remove like
router.delete("/likes/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params;

  const response = await Post.findByIdAndUpdate(postId, {
    $pull: { reactions: ObjectId(userId) },
  });

  res.status(200).send("Removed like");
});

// Get user
router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params

  const userData = await User.findById(ObjectId(userId))

  res.status(200).send(userData)
})

// Update user username
router.put("/users/:id/:username", async (req, res) => {
  const { id, username } = req.params

  const doesUserExist = await User.exists({ username: username });

  if (doesUserExist) {
    res.status(404).send({})
    return;
  } 

  const response = await User.findByIdAndUpdate(ObjectId(id), {$set: {username: username}})
  res.status(200).send(response);
})

module.exports = router;
