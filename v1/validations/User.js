const Joi = require("joi").defaults((schema) => {
    switch (schema.type) {
        case "string":
            return schema.replace(/\s+/, " ");
        default:
            return schema;
    }
});

Joi.objectId = () => Joi.string().pattern(/^[0-9a-f]{24}$/, "valid ObjectId");

module.exports.identify = Joi.object({
    id: Joi.objectId().required(),
});

module.exports.addMovie = Joi.object({
    movieName: Joi.string().required(),
    totalDurationInMin: Joi.number().required(),
    description: Joi.string().required()
});

module.exports.addVendor = Joi.object({
    vendorName: Joi.string().required(),
    hallName: Joi.string().required(),
    hallAddress: Joi.string().required()
});

module.exports.addVendorMovie = Joi.object({
    vendorId : Joi.objectId().required(),
    movieId : Joi.objectId().required(),
    movieSlot: Joi.array().items({
        title : Joi.string().required(),
        timing : Joi.array().items({
            time : Joi.string().required()
        }).required()
    }).required(),
    totalSeat : Joi.number().required(),
    seatCost : Joi.number().required()
});


module.exports.createBooking = Joi.object({
    vendorId : Joi.objectId().required(),
    movieId : Joi.objectId().required(),
    movieDate : Joi.string().required(),
    movieTime : Joi.objectId().required(),
    phone : Joi.string().required(),
    countryCode : Joi.string().required(),
    seatCount : Joi.number().required(),
    email : Joi.string().required()
});