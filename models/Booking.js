const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const autoIncrement = require('mongoose-auto-increment');
const BookingModel = new Schema({
    bookingNo : {
        type: Number
    },
    vendorId: {
        type: ObjectId,
        ref: "Vendor"
    },
    movieId: {
        type: ObjectId,
        ref: "Movie"
    },
    movieDate:{
        type: String,
        default:""
    },
    movieTime : {
        type : ObjectId
    },
    phone : {
        type : String,
        default : ""
    },
    countryCode : {
        typr : String,
        default : ""
    },
    email : {
        type: String,
        default : ""
    },
    seatCount : {
        type : Number,
        default : 1
    },
    totalCost : {
        type : Number,
        default : 0
    },
    isCancelled : {
        type : Boolean,
        default : false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});
BookingModel.plugin(autoIncrement.plugin, {
    model: "Booking",
    field: "bookingNo",
    startAt: 1000,
    incrementBy: 1
});
const Booking = mongoose.model('Booking', BookingModel);
module.exports = Booking;