const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
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
  picture: {
    type: String,
  },
})

const User = mongoose.model("User", userSchema, "User")

module.exports = {
  User,
}
