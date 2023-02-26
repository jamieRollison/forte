const { User } = require('../models')
const express = require("express");
const { Post } = require("../models");
const ObjectId = require("mongodb").ObjectId;
const request = require("request");

const router = express.Router()

// routes go here
router.get("/", (req, res) => {
  res.send("Hello World!")
})

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

// search the spotify api
router.get("/search", async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const options = {
    url: `https://api.spotify.com/v1/search?q=${q}&type=track`,
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
    },
    json: true,
  };
  const search = await request.get('');
  console.log(search.body);
  res.status(200).send(search.body);
});


module.exports = router;
