const mongoose = require('mongoose');
const { Schema } = mongoose;
const bookmarksSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    url: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    tag: {
        type: String
    },
    favorite: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Bookmark = mongoose.model('bookmarks', bookmarksSchema);
module.exports = Bookmark; 