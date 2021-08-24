const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const VendorMovieModel = new Schema({
    vendorId: {
        type: ObjectId,
        ref: "Vendor"
    },
    movieId: {
        type: ObjectId,
        ref: "Movie"
    },
    movieSlot : [{
        title: String,
        timing: [{
            time : String
        }],
    }],
    totalSeat : {
        type: Number,
        default: 50
    },
    seatCost : {
        type: Number,
        default : 10
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const VendorMovie = mongoose.model('VendorMovie', VendorMovieModel);
module.exports = VendorMovie;