const express = require("express");
const router = express.Router();
const User = require("../models/user");
const errorAsync = require("../utilities/errorAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const auth = require("../controllers/auth");

router
  .route("/register")
  .get(auth.renderRegister)
  .post(errorAsync(auth.authRegister));

router
  .route("/login")
  .get(auth.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    auth.authLogin
  );

router.get("/logout", auth.authLogout);

module.exports = router;
