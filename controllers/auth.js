const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("auth/register.ejs");
};

module.exports.authRegister = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ email, username });
    const regUser = await User.register(user, password);
    req.login(regUser, (err) => {
      if (err) return err;
      req.flash("success", "Logged In!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("auth/login.ejs");
};

module.exports.authLogin = (req, res) => {
  const { username } = req.body;
  req.flash("success", `Welcome back ${username}`);
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  res.redirect(redirectUrl);
};

module.exports.authLogout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Bye, Bye");
    res.redirect("/campgrounds");
  });
};
