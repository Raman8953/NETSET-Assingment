const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const MovieModel = new Schema({
    movieName: {
        type: String,
        default: ""
    },
    totalDurationInMin: {
        type: Number,
        default: 0
    },
    totalRating: {
        type: Number,
        default: 0
    },
    totalReviewCount: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});
const Movie = mongoose.model('Movie', MovieModel);
module.exports = Movie;