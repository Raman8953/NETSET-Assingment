const router = require("express").Router();

const Controller = require("../controllers");

//  ONBOARDING API'S
router.post("/addMovie", Controller.User.addMovie);
router.post("/addVendor", Controller.User.addVendor);
router.post("/addVendorMovie", Controller.User.addVendorMovie);
router.post("/getAllMovie", Controller.User.getAllMovie);
router.post("/getMovieById", Controller.User.getMovieById);
router.post("/createBooking", Controller.User.createBooking);

module.exports = router;
