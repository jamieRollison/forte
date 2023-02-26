const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
  },
  songId: {
    type: String,
  },
  comments: {
    type: [Schema.Types.ObjectId],
  },
  reactions: {
    type: [Schema.Types.ObjectId],
  },
  dateCreated: {
    type: Date,
  },
})

const Post = mongoose.model("Post", postSchema, "Post")

module.exports = {
  Post,
}
