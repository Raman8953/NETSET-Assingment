const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
global.ObjectId = mongoose.Types.ObjectId;

module.exports.mongodb = async () => {
    await mongoose.connect(
        process.env.MONGODB_URL,
        {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
        },
        (error, result) => {
            error ? console.error("Mongo", error) : console.log("Mongo Connected");
        }
    );
};
autoIncrement.initialize(mongoose);
