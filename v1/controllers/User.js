const _ = require("lodash");
const Model = require("../../models");
const Validation = require("../validations");
const functions = require("../../common/functions");
const emailService = require("../../services/EmalService");
const constants = require("../../common/constants");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const moment = require('moment');
const { number } = require("joi");


const _sendEmail = async (doc, email) => {
  try {
    if (!doc) throw new Error("Document Missing");
    if (!email) throw new Error("Email Missing");

    doc = JSON.parse(JSON.stringify(doc));

    emailService.mailer({
      to: email,
      title: "Booking Confirm",
      message: `Your booking number is ${doc.bookingNo}. Please come booking time for better view.`,
    })
  } catch (error) {
    console.error("_sendEmailVerification", error);
  }
}

module.exports.addMovie = async (req, res, next) => {
  try {
    await Validation.User.addMovie.validateAsync(req.body);
    const doc = await Model.MovieModel.create(req.body);
    await doc.save();
    return res.success("Movie add successfully.", doc);
  } catch (error) {
    next(error);
  }
};

module.exports.addVendor = async (req, res, next) => {
  try {
    await Validation.User.addVendor.validateAsync(req.body);
    const doc = await Model.VendorModel.create(req.body);
    await doc.save();
    return res.success("Vendor add successfully.", doc);
  } catch (error) {
    next(error);
  }
};

module.exports.addVendorMovie = async (req, res, next) => {
  try {
    await Validation.User.addVendorMovie.validateAsync(req.body);
    req.body.availableSeat = req.body.totalSeat;
    const doc = await Model.VendorMovieModel.create(req.body);
    await doc.save();
    return res.success("Movies add success by vendor.", doc);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMovie = async (req, res, next) => {
  try {
    let limit = 10;
    let page = req.body.page;
    let search = req.body.search;
    let criteria = {
      isDeleted : false
    }
    if (search != "" && search != null) {
      search = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      criteria.$or = [
        {
          movieName: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    const doc = await Model.MovieModel.find(criteria).limit(limit).skip(page * limit).sort({
      createdAt : -1
    })
    const count = await Model.MovieModel.countDocuments(criteria)
    return res.success("Success", {doc,count});
  } catch (error) {
    next(error);
  }
};

module.exports.getMovieById = async (req, res, next) => {
  try {
    let limit = 10;
    let page = req.body.page;
    const movieId = req.body.movieId;
    const ticketDate = req.body.ticketDate || moment();
    const slotId = req.body.slotId;
    let checkMovie = await Model.MovieModel.findOne({
      _id: ObjectId(movieId),
      isDeleted : false
    })
    if(checkMovie == null){
      throw new Error('Not Found')
    }
    let criteria = {
      movieId : ObjectId(movieId),
      isDeleted : false
    }
    let doc = await Model.VendorMovieModel.find(criteria).limit(limit).skip(page * limit).sort({
      createdAt : -1
    }).populate("movieId","movieName totalDurationInMin totalRating totalReviewCount description")
    .populate("vendorId","hallName hallAddress")

    const count = await Model.MovieModel.countDocuments(criteria)
    return res.success("Success", {doc,count});
  } catch (error) {
    next(error);
  }
};

module.exports.createBooking = async (req, res, next) => {
  try {
    await Validation.User.createBooking.validateAsync(req.body);
    const vendorId = req.body.vendorId;
    const movieId = req.body.movieId;
    const email = req.body.email;
    let chekMovie = await Model.VendorMovieModel.findOne({
      vendorId : ObjectId(vendorId),
      movieId : ObjectId(movieId),
      isDeleted : false
    })
    if(chekMovie == null){
      throw new Error('Not Found')
    }
    req.body.totalCost = functions.toDecimals(chekMovie.seatCost * req.body.seatCount);
    const doc = await Model.BookingModel(req.body);
    await doc.save();
    if (req.body.email) await _sendEmail(doc, req.body.email);
    return res.success("Movies add success by vendor.", doc);
  } catch (error) {
    next(error);
  }
};