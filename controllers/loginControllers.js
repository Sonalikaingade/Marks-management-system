const facultyModel = require("./../models/facultyModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getRegisterPage = (req, res) => {
  res.render("registerPage");
};

exports.getHomePage = (req, res) => {
  res.render("home");
};

exports.saveRegisterData = async (req, res) => {
  const { FID, email, password, confirmPassword } = req.body;

  const exist = await facultyModel.findOne({ FID });

  if (!exist) {
    if (password != confirmPassword) {
      const msg = "Passward and confirm password should be same";
      res.render("registerPage", { msg });
    } else {
      let hashPassward = await bcrypt.hash(password, 10);

      const facultyDetail = await facultyModel
        .create({ FID, email, password: hashPassward })
        .then((result) => {
          console.log("Data saved");
          const secret = "my-secret-string-used-in-formation-of-token";
          const expiresIn = 3 * 60 * 60 * 24 * 1000;
          const token = jwt.sign({ id: result._id }, secret, {
            expiresIn,
          });

          res.status(201).redirect("/register");
        });
    }
  } else {
    const msg = "This faculty Id already exsist";
    res.render("registerPage", { msg });
  }
};

exports.getLoginPage = (req, res) => {
  res.render("loginpage");
};

let correctPassword = async function (enterPassword, userPassword) {
  const bo = await brcypt.compare(enterPassword, userPassword);
  return bo;
};

exports.postLoginData = async (req, res) => {
  const { FID, password } = req.body;
  const exist = await facultyModel.findOne({ FID });
  if (!exist) {
    const msg = "Please first register";
    res.render("registerPage", { msg });
  } else {
    if (exist || correctPassword(password, exist.password)) {
      const secret = "my-secret-string-used-in-formation-of-token";
      const expiresIn = 3 * 24 * 60 * 60;
      const token = jwt.sign({ id: exist._id }, secret, {
        expiresIn,
      });

      res.cookie("jwt", token, {
        httpOnly: true,
        expiresIn: expiresIn * 1000,
      });
      console.log("done");

      res.status(201).redirect("/loginUser/home");
    }
  }
};

exports.protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    res.redirect("/login");
  } else {
    const secret = "my-secret-string-used-in-formation-of-token";

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  }
};
