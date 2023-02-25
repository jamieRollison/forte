const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commenterId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema, 'Comment');

module.exports = {
    Comment,
};