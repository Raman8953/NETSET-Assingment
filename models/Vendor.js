const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const VendorModel = new Schema({
    vendorName: {
        type: String,
        default: ""
    },
    hallName: {
        type: String,
        default: ""
    },
    hallAddress: {
        type: String,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});
const Vendor = mongoose.model('Vendor', VendorModel);
module.exports = Vendor;