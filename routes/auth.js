const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { genSalt } = require("bcrypt");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndDeskOfficer,
  verifyTokenAndAdmin,
  verifyTokenAndAO,
  verifyToken,
} = require("../utils/verifyToken");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(config.SEND_GRID_API_KEY);

//RefreshTokens Array
let refreshTokensArray = [];

//Register
router.post("/register", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Check if User Exists
    const userEmailExist = await User.findOne({ email: req.body.email });
    const userUsernameExist = await User.findOne({
      username: req.body.username,
    });

    if (userUsernameExist) {
      return res.status(400).json({
        error: true,
        message: `User with username: ${req.body.username} already Exists`,
      });
    }

    if (userEmailExist) {
      return res.status(400).json({
        error: true,
        message: `User with email: ${req.body.email} already Exists`,
      });
    }

    //Encrypt Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Generate New User
    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
    });
    // Save User to DB
    const user = await newUser.save();
    res.status(200).json("User Added Successfully");

    // Send Email to User
    const msg = {
      to: req.body.email,
      from: "tvstditfstorage@gmail.com",
      subject: "Special Intervention Programme Archive Registration",
      text: "Welcome to TVSTD Special Intervention Programme Archive Databank",
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email Sent");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json("User Not Found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // !validPassword && res.status(400).json("Wrong Password")
    if (!validPassword) {
      return res.status(400).json("Wrong Password");
    }

    //Accesstoken
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        isMgt: user.isMgt,
        isAO: user.isAO,
        isDeskOfficer: user.isDeskOfficer,
      },
      config.JWT_SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );

    // Refreshtoken
    const refreshToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        isMgt: user.isMgt,
        isAO: user.isAO,
        isDeskOfficer: user.isDeskOfficer,
      },
      config.JWT_RFR_SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );

    refreshTokensArray.push(refreshToken);

    const { password, ...others } = user._doc; // Check if the Phone number goes to the Front-End
    return res.status(200).json({ ...others, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json(error);
  }
});

//Generate Refresh Token
router.post("/refreshtoken", async (req, res) => {
  try {
    const refreshAccessToken = req.body.refreshToken;
    // const user = await User.findOne({ username: req.body.username });

    if (!refreshAccessToken) {
      return res.status(401).json("You are not Authenticated");
    }

    if (!refreshTokensArray.includes(refreshAccessToken)) {
      return res.status(403).json("Refresh Token is not Valid");
    }

    await jwt.verify(
      refreshAccessToken,
      config.JWT_RFR_SECRET_KEY,
      (error, user) => {
        error && console.log(error);

        refreshTokensArray = refreshTokensArray.filter(
          (token) => token !== refreshAccessToken
        );

        //Accesstoken
        const newAccessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
            isMgt: user.isMgt,
            isAO: user.isAO,
            isDeskOfficer: user.isDeskOfficer,
          },
          config.JWT_SECRET_KEY,
          {
            expiresIn: "60m",
          }
        );

        // Refreshtoken
        const newRefreshToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
            isMgt: user.isMgt,
            isAO: user.isAO,
            isDeskOfficer: user.isDeskOfficer,
          },
          config.JWT_RFR_SECRET_KEY,
          {
            expiresIn: "60m",
          }
        );

        refreshTokensArray.push(newRefreshToken);

        res.status(200).json({
          accessToken: newAccessToken,
          refreshAccessToken: newRefreshToken,
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

//Logout
router.post("/logout", (req, res) => {
  const refreshAccessToken = req.body.refreshToken;
  refreshTokensArray = refreshTokensArray.filter(
    (token) => token !== refreshAccessToken
  );
  res.status(200).json("You logged out successfully");
});

module.exports = router;
