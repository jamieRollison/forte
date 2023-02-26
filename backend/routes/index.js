const express = require("express");
const { Post } = require("../models");
const ObjectId = require("mongodb").ObjectId;

const router = express.Router()

// routes go here
router.get("/", (req, res) => {
  res.send("Hello World!");
});

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

module.exports = router;
