const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
  spotifyUsername: {
    type: String,
  },
  posts: {
    type: [Schema.Types.ObjectId],
  },
  friends: {
    type: [Schema.Types.ObjectId],
  },
})

const User = mongoose.model("User", userSchema, "User")

module.exports = {
  User,
}
