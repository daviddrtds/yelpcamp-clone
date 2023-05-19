const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Campground = require("../models/campground");
const Review = require("../models/review");
const rvws = require("../controllers/reviews");
const ejsMate = require("ejs-mate");
const errorAsync = require("../utilities/errorAsync");
const expressError = require("../utilities/expressError");
const { joiSchema, reviewSchema } = require("../utilities/schemas");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewOwner } = require("../middleware");

router.post("/", isLoggedIn, validateReview, errorAsync(rvws.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewOwner,
  errorAsync(rvws.deleteReview)
);

module.exports = router;
