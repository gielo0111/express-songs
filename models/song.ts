import mongoose from 'mongoose';
const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    artist: {
        type: String,
        required: false
    }, 
    lyrics: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("Song", songSchema)