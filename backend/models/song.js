const mongoose = require("mongoose")
const Schema = mongoose.Schema

const songSchema =  new Schema({
    songName: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    imgUrl: {
        type:String
    }
});

const Song = mongoose.model("Song", songSchema, "Song")

module.exports = {
  Song,
}
