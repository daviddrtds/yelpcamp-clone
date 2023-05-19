const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Campground = require("../models/campground");
const camps = require("../controllers/campgrounds");
const Review = require("../models/review");
const ejsMate = require("ejs-mate");
const errorAsync = require("../utilities/errorAsync");
const expressError = require("../utilities/expressError");
const { joiSchema, reviewSchema } = require("../utilities/schemas");
const router = express.Router();
const { isLoggedIn, validateCamp, isOwner } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary/cloudindex");
const upload = multer({ storage });

router
  .route("/")
  .get(errorAsync(camps.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCamp,
    errorAsync(camps.createCamp)
  );

router.get("/new", isLoggedIn, camps.renderNewForm);

router
  .route("/:id")
  .get(errorAsync(camps.showCamp))
  .put(
    isLoggedIn,
    isOwner,
    upload.array("image"),
    validateCamp,
    errorAsync(camps.updateCamp)
  )
  .delete(isLoggedIn, isOwner, errorAsync(camps.deleteCamp));

router.get("/:id/edit", isLoggedIn, isOwner, errorAsync(camps.renderEditForm));

module.exports = router;
